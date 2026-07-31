// imports
import e from "express";
import { prisma } from "../config/db.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsyncError.js";

// cart controllers
export const addToCart = catchAsync(async (req, res, next) => {
  //console.log(req.body);
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  if (!product.stock >= req.body.quantity) {
    return next(
      new AppError(
        `Insufficient stock for ${product.name}. Try adding fewer to cart?`,
      ),
    );
  }
  // if cart already includes the product
  let cartItem = await prisma.cart.findUnique({
    where: {
      userId_productId: {
        userId: req.user.id,
        productId: req.body.productId,
      },
    },
  });
  if (cartItem) {
    //product already in cart.. update quantity
    cartItem.quantity += req.body.quantity;
    if (cartItem.quantity > product.stock) {
      return next(new AppError(`Insufficient stock for ${product.name}`, 400));
    }
  }
  // not in cart. Add to cart as new
  cartItem = await prisma.cart.create({
    data: {
      userId: req.user.id,
      productId: req.body.productId,
      quantity: req.body.quantity,
    },
    select: {
      quantity: true,
      product: {
        select: {
          name: true,
          price: true,
          shortDescription: true,
          imageUrl: true,
        },
      },
    },
  });
  return res.status(200).json({
    status: "success",
    message: "Item added to Cart",
    data: cartItem,
  });
});
export const getMyCart = catchAsync(async (req, res, next) => {
  const cartItems = await prisma.cart.findMany({
    select: {
      product: {
        select: {
          name: true,
          price: true,
          imageUrl: true,
        },
      },
      quantity: true,
    },
  });

  return res.status(200).json({
    status: "success",
    data: cartItems,
  });
});
export const updateCartItem = catchAsync(async (req, res, next) => {
  const cartItem = await prisma.cart.findUnique({
    where: {
      userId_productId: {
        userId: req.user.id,
        productId: Number(req.params.productId),
      },
    },
    include: {
      product: true,
    },
  });
  if (!cartItem) {
    return next(new AppError("No such Item in cart", 404));
  }
  //stock validation
  if (!cartItem.product.stock >= req.body.quantity) {
    return next(new AppError("Insufficient stock. Try Adding fewer?", 400));
  }
  // update cart Item
  const updatedCartItem = await prisma.cart.update({
    where: {
      userId_productId: {
        userId: req.user.id,
        productId: Number(req.params.productId),
      },
    },
    data: req.body, // the increased/decreased quantity in general
    select: {
      quantity: true,
      product: {
        select: {
          name: true,
          price: true,
          imageUrl: true,
        },
      },
    },
  });
  return res.status(200).json({
    status: "success",
    message: "Cart Updated",
    data: updatedCartItem,
  });
});
export const removeCartItem = catchAsync(async (req, res, next) => {
  await prisma.cart.delete({
    where: {
      userId_productId: {
        userId: req.user.id,
        productId: Number(req.params.productId),
      },
    },
  });
  return res.status(200).json({
    message: "Cart Item Removed. Undo?",
  });
});

// clear cart after checkout/clear cart
export const clearCart = catchAsync(async (req, res, next) => {
  await prisma.cart.deleteMany({
    where: {
      userId: req.user.id,
    },
  });
  return res.status(200).json({
    status: "success",
    message: "Cart Cleared Successfully",
  });
});
