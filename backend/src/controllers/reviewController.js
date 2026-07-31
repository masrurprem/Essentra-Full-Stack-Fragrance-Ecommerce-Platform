import { prisma } from "../config/db.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsyncError.js";
import { filterObj } from "../utils/filterBody.js";

// review controllers
export const createReview = catchAsync(async (req, res) => {
  //1) check if product exists still
  const product = await prisma.product.findUnique({
    where: {
      id: Number(req.params.productId),
    },
  });
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  //2) check if comment is present and not kept empty
  if (!req.body.comment.trim() || req.body.comment.trim().length === 0) {
    throw new AppError("Review must contain a comment", 400);
  }
  //3) check if the user has purchased the product before
  const hasPurchasedOrder = await prisma.order.findFirst({
    where: {
      userId: req.user.id,
      orderItems: {
        some: {
          productId: Number(req.params.productId),
        },
      },
    },
  });
  if (!hasPurchasedOrder) {
    throw new AppError("You can only review products you have purchased", 400);
  }
  //4) all ok: create product review
  const productReview = await prisma.review.create({
    data: {
      userId: req.user.id,
      productId: Number(req.params.productId),
      comment: req.body.comment,
    },
  });
  //5) response
  return res.status(201).json({
    status: "success",
    data: {
      review: productReview,
    },
  });
});
export const updateReview = catchAsync(async (req, res) => {
  const Review_Update_Fields = ["comment", "rating"];
  // filter relevant fields to update
  const fieldsFiltered = filterObj(req.body, ...Review_Update_Fields);
  //update
  const editedReview = await prisma.review.update({
    where: {
      id: Number(req.params.reviewId),
    },
    data: fieldsFiltered,
  });
  // response
  return res.status(200).json({
    status: "success",
    data: {
      review: editedReview,
    },
  });
});

export const deleteReview = catchAsync(async (req, res) => {
  const review = await prisma.review.findUnique({
    where: {
      id: Number(req.params.reviewId),
    },
  });
  //

  // check if the user posted the review or is an admin
  if (review.userId !== req.user.id && req.user.role !== "ADMIN") {
    throw new AppError("You are not authorized to delete this review", 403);
  }
  //
  await prisma.review.delete({
    where: {
      id: Number(req.params.reviewId),
    },
  });
  //response
  return res.status(204).send();
});
