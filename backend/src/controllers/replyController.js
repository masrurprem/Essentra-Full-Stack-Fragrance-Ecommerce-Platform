import { prisma } from "../config/db.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsyncError.js";
import { filterObj } from "../utils/filterBody.js";

// review controllers
export const createReply = catchAsync(async (req, res) => {
  //1) if review exists
  const review = await prisma.review.findUnique({
    where: {
      id: Number(req.params.reviewId),
    },
  });
  if (!review) {
    throw new AppError("Review not found", 404);
  }
  //2) check if reply text is present and not empty
  if (!req.body.text.trim() || req.body.text.trim().length === 0) {
    throw new AppError("Please include some reply text", 400);
  }
  //3) create the reply
  const reply = await prisma.reply.create({
    data: {
      text: req.body.text,
      reviewId: Number(req.params.reviewId),
      userId: req.user.id,
    },
  });
  //4) response
  return res.status(201).json({
    status: "success",
    data: {
      reply: reply,
    },
  });
});
export const updateReply = catchAsync(async (req, res) => {
  const Reply_Update_Fields = ["text"];
  // filter relevant fields to update
  const fieldsFiltered = filterObj(req.body, ...Reply_Update_Fields);
  //update
  const editedReply = await prisma.reply.update({
    where: {
      id: Number(req.params.replyId),
    },
    data: fieldsFiltered,
  });
  return res.status(200).json({
    status: "success",
    data: {
      reply: editedReply,
    },
  });
});
export const deleteReply = async (req, res) => {
  const reply = await prisma.reply.findUnique({
    where: {
      id: Number(req.params.replyId),
    },
  });
  //check if the user owns the reply or is an admin
  if (reply.userId !== req.user.id && req.user.role !== "ADMIN") {
    throw new AppError("You cannot delete this comment", 403);
  }
  // delete the reply
  await prisma.reply.delete({
    where: {
      id: Number(req.params.replyId),
    },
  });
  //response
  return res.status(204).send();
};
