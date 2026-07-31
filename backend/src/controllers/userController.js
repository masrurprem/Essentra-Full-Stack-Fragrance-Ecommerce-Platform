import { prisma } from "../config/db.js";
import { filterObj } from "../utils/filterBody.js";
import { createFieldsObj } from "../utils/selectFields.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsyncError.js";

// get all the users from db
export const getAllUsers = catchAsync(async (req, res) => {
  const queryObjFilter = { ...req.query };
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
  ];
  //include only filter-specific fields
  excludedFields.forEach((unwantedField) => {
    delete queryObjFilter[unwantedField];
  });

  //if filter Query has date then format first
  if (Object.keys(queryObjFilter).includes("createdAfter")) {
    queryObjFilter["createdAfter"] = new Date(queryObjFilter["createdAfter"]);
  }
  //1) filtering clause
  let whereClause = {};
  if (Object.keys(queryObjFilter).length > 0) {
    //has query str for filtering data
    ((whereClause.role = queryObjFilter.role),
      (whereClause.createdAt = { gte: queryObjFilter.createdAfter }));
  }

  //2) sort: criterias

  const sortCriteria = {
    createdAt_asc: { createdAt: "asc" },
    name_desc: { name: "desc" },
    name_asc: { name: "asc" },
    id_asc: { id: "asc" },
    id_desc: { id: "desc" },
  };
  // sort by criteria or by default (newest first)
  const sortClause = sortCriteria[req.query.sortBy] || { createdAt: "desc" };
  //3) paginating clause
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  // handle error:  skip>totalUser
  const totalUser = await prisma.user.count();
  if (skip >= totalUser) {
    // no content to show
    throw new AppError("Looks like nothing found in this location", 404);
  }

  //4) field selection clause
  const fieldClause = req.query.fields ? createFieldsObj(req.query.fields) : {};
  const fieldDefault = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    role: true,
  };

  const allUsers = await prisma.user.findMany({
    //filtering
    // where: {
    //   role: queryObjFilter.role,
    //   createdAt: {
    //     gte: queryObjFilter.createdAfter,
    //   },
    // },
    where: whereClause,
    //sorting
    orderBy: sortClause,
    //pagination
    skip: skip,
    take: limit,

    //selecting fields
    select: Object.keys(fieldClause).length > 0 ? fieldClause : fieldDefault,
  });
  // console.log("queryObjFilter: ", queryObjFilter);
  // console.log("whereClause: ", whereClause);
  // console.log("req.query", req.query);
  // console.log("sortClause", sortClause);
  // console.log("selected fields-->", req.query.fields);

  return res.status(200).json({
    status: "success",
    count: allUsers.length,
    data: allUsers,
  });
});

// get a user by Id
export const getUserById = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  if (!user) {
    throw new AppError("No user records found", 404);
  }
  return res.status(200).json({
    status: "success",
    data: user,
  });
});

//update current user data (password excluding)
export const updateMe = catchAsync(async (req, res, next) => {
  //1. discard if user wants to update password
  if (req.body.password) {
    throw new AppError(
      "Not Allowed. Go to /updateMyPassword for password updation",
      400,
    );
    //   throw
    //     new AppError(
    //       "Not Allowed. Go to /updateMyPassword for Password Updation",400);
  }
  //2. filter unwanted fields that are not allowed to update by general user
  const allowedFieldsObj = filterObj(req.body, "name", "email");
  //3.update user data and send response with updated user data
  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: allowedFieldsObj,
  });
  // send updated user
  return res.status(200).json({
    status: "success",
    data: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      updatedAt: updatedUser.updatedAt,
    },
  });
});

//delete current user account--> user level later to be added
//.. to be continued

// delete an user with id --> admin level
export const deleteUser = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);
  //delete user record from DB
  await prisma.user.delete({
    where: { id },
  });
  return res.status(204).send();
});
