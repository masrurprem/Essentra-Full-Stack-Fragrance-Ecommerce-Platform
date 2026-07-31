//imports
import { prisma } from "../config/db.js";
import { filterObj } from "../utils/filterBody.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsyncError.js";

// category controllers
//
export const createCategory = catchAsync(async (req, res) => {
  const category = await prisma.category.create({
    data: req.body,
    select: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
    },
  });
  return res.status(201).json({
    status: "success",
    data: category,
  });
});

export const getAllCategories = catchAsync(async (req, res) => {
  //paginating clause
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  // handle error if skip>=total categories
  const categoryCount = await prisma.category.count();
  if (skip >= categoryCount) {
    throw new AppError(
      "Nothing in this Location. Embarrassing, isn't it?",
      400,
    );
    // return res.status(400).json({
    //   status: "error",
    //   message: "Nothing in this Location. Embarrassing, isn't it?",
    // });
  }

  // sorting clause
  const sortCriteria = {
    latest: { createdAt: "desc" },
    oldest: { createdAt: "asc" },
    "name-desc": { name: "desc" },
    "name-asc": { name: "asc" },
    "most-products": {
      products: {
        _count: "desc",
      },
    },
    "least-products": {
      products: {
        _count: "asc",
      },
    },
  };
  // sort by criteria or by default newest first

  const sortClause = req.query.sortBy
    ? sortCriteria[req.query.sortBy]
    : { createdAt: "desc" };

  //field selection clause
  const defaultFields = {
    name: true,
    slug: true,
    _count: {
      select: {
        products: true,
      },
    },
  };
  // consoles for testing
  // console.log(req.query.sortBy);
  // console.log(sortClause);
  // find the categories
  const categories = await prisma.category.findMany({
    // filter
    where: {},
    //sort
    orderBy: sortClause,
    //pagination
    skip: skip,
    take: limit,

    // fields
    select: defaultFields,
  });

  // refine response to send
  const categoryResponse = categories.map((categoryObj) => {
    const { _count, ...primaryData } = categoryObj;
    const newResponseObj = {
      ...primaryData,
      productCount: _count.products,
    };
    return newResponseObj;
  });

  return res.status(200).json({
    status: "success",
    count: categoryResponse.length,
    data: categoryResponse,
  });
});
//
export const getCategoryById = catchAsync(async (req, res, next) => {
  const category = await prisma.category.findUnique({
    where: { id: Number(req.params.id) },
    select: {
      name: true,
      slug: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
  if (!category) {
    return next(new AppError("Oops..No such Category", 404));
  }
  return res.status(200).json({
    status: "success",
    data: category,
  });
});
//
export const updateCategory = catchAsync(async (req, res, next) => {
  const Category_Update_Fields = ["name", "slug"];
  // filter req.body for relevant fields
  const fieldsFiltered = filterObj(req.body, ...Category_Update_Fields);
  //console.log(fieldsFiltered);
  const updatedCategory = await prisma.category.update({
    where: {
      id: Number(req.params.id),
    },
    data: fieldsFiltered,
    select: {
      name: true,
      slug: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
  //refine response to send
  const { _count, ...catData } = updatedCategory;
  const categoryUpdateResponse = {
    ...catData,
    productCount: _count.products,
  };

  return res.status(200).json({
    status: "success",
    data: categoryUpdateResponse,
  });
});
//
export const deleteCategory = catchAsync(async (req, res, next) => {
  await prisma.category.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  return res.status(204).send();
});

//getting products having no categories--> shift to product controller later
export const get_Uncategorized_Products = catchAsync(async (req, res, next) => {
  const Uncategorized_Products = await prisma.product.findMany({
    where: {
      categories: {
        none: {},
      },
    },
  });
  return res.status(200).json({
    status: "success",
    data: Uncategorized_Products,
  });
});
