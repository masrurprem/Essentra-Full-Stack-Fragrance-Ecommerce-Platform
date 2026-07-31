//imports
import multer from "multer";
import path from "path";
import { prisma } from "../config/db.js";
import { filterObj } from "../utils/filterBody.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsyncError.js";
// image upload products:: multer configuration
//1) storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("uploads", "img", "products"));
  },
  filename: (req, file, cb) => {
    //console.log("saving image..");
    const extension = file.mimetype.split("/")[1];
    cb(null, `product-${Date.now()}-${req.user.id}.${extension}`);
  },
});
//2) filter
const multerFilterImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Uploaded file must be an image.", 400), false);
  }
};

//
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilterImage,
});
export const uploadProductImageMiddleware = upload.single("image");

// the product controllers
// create product
export const createProduct = catchAsync(async (req, res) => {
  // req.body
  const {
    name,
    slug,
    description,
    shortDescription,
    price,
    stock,
    categoryIds,
  } = req.body;
  // product obj w/o category array
  const productObj = {
    name,
    slug,
    description,
    shortDescription,
    price,
    stock,
  };

  // post product data and category to DB

  const product = await prisma.product.create({
    data: {
      ...productObj,
      categories: {
        create: categoryIds.map((id) => {
          return {
            category: { connect: { id } },
          };
        }),
      },
    },
    // select fields for response
    select: {
      name: true,
      slug: true,
      shortDescription: true,
      price: true,
      stock: true,
      categories: {
        select: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  //refine response to send
  const productResponse = {
    ...product,
    categories: product.categories.map((catElement) => {
      return catElement.category;
    }),
  };

  //send response
  return res.status(201).json({
    status: "success",
    data: productResponse,
  });
});

// get all products
export const getAllProducts = catchAsync(async (req, res) => {
  //filter clause
  console.log(req.query);
  const queryFilterObj = { ...req.query };
  const excludedFields = [
    "limit",
    "page",
    "paged",
    "per_page",
    "sort",
    "sortBy",
    "fields",
    "orderBy",
    "search",
    "s",
    "p",
    "q",
  ];
  //include only filter-specific query strings
  excludedFields.forEach((unwantedField) => {
    delete queryFilterObj[unwantedField];
  });
  //filter clause
  let whereClause = {};

  if (Object.keys(queryFilterObj).length > 0) {
    whereClause.price = {
      gte: queryFilterObj.min_price,
      lte: queryFilterObj.max_price,
    };
    whereClause.stock = {
      gt: queryFilterObj.stock_status === "instock" ? 0 : undefined,
    };
    if (queryFilterObj.category) {
      whereClause.categories = {
        some: { category: { slug: queryFilterObj.category } },
      };
      //since related field and we will link via unique slug from frontend
    }
  }
  // search clause

  if (req.query.search) {
    const { search: searchTerm } = req.query;
    // console.log(typeof req.query.search);
    // console.log(typeof searchTerm);
    whereClause.OR = [
      {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        shortDescription: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        categories: {
          some: {
            category: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        },
      },
    ];
  }

  // sorting clause
  const sortCriteria = {
    latest: { createdAt: "desc" },
    "price-asc": { price: "asc" },
    "price-desc": { price: "desc" },
  };
  // sort obj or default is latest
  const sortClause = sortCriteria[req.query.sortBy] || { createdAt: "desc" };
  // pagination clause
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 7;
  const skip = (page - 1) * limit;
  // handle error if skip>=total products
  const productCount = await prisma.product.count();
  if (skip >= productCount) {
    throw new AppError(
      "Nothing in this Location. Embarrassing, isn't it?",
      400,
    );
  }
  // selection clause
  const defaultFields = {
    name: true,
    slug: true,
    description: false,
    shortDescription: true,
    price: true,
    stock: true,
    categories: {
      select: {
        category: {
          select: {
            id: false,
            name: true,
            slug: false,
          },
        },
      },
    },
  };
  // to be added later if case arises nor empty obj by default
  const selectedFields = {};

  const products = await prisma.product.findMany({
    // filtering and optionally searching
    where: whereClause,
    //sorting
    orderBy: sortClause,
    //pagination
    skip: skip,
    take: limit,
    //selecting fields
    select:
      Object.keys(selectedFields).length > 0 ? selectedFields : defaultFields,
  });

  // refine products array to send response
  const responseProducts = products.map((productObj) => {
    const { categories, ...primaryData } = productObj;
    return {
      ...primaryData,
      categories: categories.map((catObj) => catObj.category),
    };
  });

  return res.status(200).json({
    status: "success",
    count: responseProducts.length,
    data: responseProducts,
  });
});

// get one product
export const getProductBySlug = catchAsync(async (req, res) => {
  const slug = req.params.slug;

  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
    select: {
      name: true,
      slug: true,
      description: false,
      shortDescription: true,
      price: true,
      stock: true,
      categories: {
        select: {
          category: {
            select: {
              id: false,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });
  if (!product) {
    throw new AppError("Looks like product doesn't exist", 404);
  }
  // refine product response
  const productResponse = {
    ...product,
    categories: product.categories.map((catElement) => catElement.category),
  };
  return res.status(200).json({
    status: "success",
    data: productResponse,
  });
});
// update product
export const updateProduct = catchAsync(async (req, res) => {
  // include only relevant fields
  const Product_Update_Fields = [
    "name",
    "slug",
    "description",
    "shortDescription",
    "imageUrl",
    "name",
    "price",
    "stock",
    "categoryIds",
  ];
  const fieldsFiltered = filterObj(req.body, ...Product_Update_Fields);
  // handle category separately as it's relational data
  const { categoryIds, ...productData } = fieldsFiltered;
  if (categoryIds) {
    productData.categories = {
      deleteMany: {},
      create: categoryIds.map((id) => {
        return { category: { connect: { id } } };
      }),
    };
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: Number(req.params.id),
    },
    data: productData,
    select: {
      name: true,
      slug: true,
      shortDescription: true,
      price: true,
      stock: true,
      categories: {
        select: {
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });
  //refine response
  const updatedProductResponse = {
    ...updatedProduct,
    categories: updatedProduct.categories.map((catObj) => catObj.category),
  };

  return res.status(200).json({
    status: "success",
    message: updatedProductResponse,
  });
});
// delete product
export const deleteProduct = catchAsync(async (req, res) => {
  await prisma.product.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  return res.status(204).send();
});

// upload/update product image controller
export const uploadImageController = catchAsync(async (req, res) => {
  //console.log("image controller running");
  // check if req.file contains the image file obj
  if (!req.file) {
    throw new AppError("Please upload an image!", 400);
  }
  const productWithImage = await prisma.product.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      imageUrl: req.file.filename,
    },
  });

  //send response
  return res.status(200).json({
    status: "success",
    message: "Image upload successful",
    data: {
      product: productWithImage,
    },
  });
});
