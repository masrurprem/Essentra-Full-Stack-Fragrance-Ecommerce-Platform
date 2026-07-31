import { PaymentStatus } from "@prisma/client";
import { prisma } from "../config/db.js";
import { filterObj } from "../utils/filterBody.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsyncError.js";
import { createOrderService } from "../services/orderServices.js";

// order controllers
//
export const createMyOrder = catchAsync(async (req, res) => {
  //1) create a new order
  const newOrder = await createOrderService(req.user.id, req.body);

  //2) send order response
  return res.status(201).json({
    status: "success",
    data: {
      order: newOrder,
    },
  });
});
//
export const getMyOrderAll = catchAsync(async (req, res, next) => {
  // useful to see all my orders accessed from profile dashboard

  //sortClaue
  const sortCriteria = {
    lowestAmount: { totalAmount: "asc" },
    highestAmount: { totalAmount: "desc" },
    newest: { createdAt: "desc" },
    oldest: { createdAt: "asc" },
  };

  // sort by criteria or by default newest orders first
  const sortClause = sortCriteria[req.query.sortBy] || {
    createdAt: "desc",
  };
  //pagination clause
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const orderCount = await prisma.order.count({
    where: {
      userId: req.user.id,
    },
  });
  //console.log(orderCount);
  if (orderCount === 0) {
    return next(new AppError("No orders yet", 400));
  }
  // handle error if skip>=total categories
  if (skip >= orderCount) {
    return next(new AppError("Nothing to show.. Are you alright?", 400));
  }

  // orderCount>0 so fetch the orders
  const myOrders = await prisma.order.findMany({
    where: {
      userId: req.user.id,
    },
    //select fields
    select: {
      subTotal: true,
      shippingCost: true,
      totalAmount: true,
      paymentMethod: true,
      paymentStatus: true,
      orderStatus: true,
      shippingAddress: true,
      contactNumber: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      orderItems: {
        select: {
          quantity: true,
          unitPrice: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
              price: true,
            },
          },
        },
      },
    },

    //sorting
    orderBy: sortClause,

    //pagination
    take: limit,
    skip: skip,
  });

  res.status(200).json({
    status: "success",
    data: myOrders,
  });
});
export const getMyOrderDetails = catchAsync(async (req, res, next) => {
  const orderDetails = await prisma.order.findUnique({
    where: {
      id: Number(req.params.id),
    },
    //select fields
    select: {
      subTotal: true,
      shippingCost: true,
      totalAmount: true,
      paymentMethod: true,
      paymentStatus: true,
      orderStatus: true,
      shippingAddress: true,
      contactNumber: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      orderItems: {
        select: {
          quantity: true,
          unitPrice: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
              price: false,
            },
          },
        },
      },
    },
  });
  if (!orderDetails) {
    return next(new AppError("No order found with the matched Id", 404));
  }
  return res.status(200).json({
    status: "success",
    data: orderDetails,
  });
});

export const cancelMyOrder = catchAsync(async (req, res, next) => {
  //update order status to CANCELLED if user is allowed to cancel any requested order ,say, within a time limit

  const cancelledOrder = await prisma.order.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      orderStatus: "CANCELLED",
    },
    select: {
      id: true,
      totalAmount: true,
      orderStatus: true,
      paymentStatus: true,
      shippingAddress: true,
      orderItems: {
        select: {
          quantity: true,
          unitPrice: true,
          product: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return res.status(200).json({
    status: "success",
    message: "Order has now been cancelled",
    data: cancelledOrder,
  });
});
//for order tracking
export const trackMyOrder = catchAsync(async (req, res, next) => {
  const trackedOrder = await prisma.order.findFirst({
    where: {
      id: req.body.orderId,
      user: {
        email: req.body.email,
      },
    },
    select: {
      id: true,
      orderStatus: true,
      subTotal: true,
      shippingCost: true,
      totalAmount: true,
      paymentMethod: true,
      paymentStatus: true,
      shippingAddress: true,
      contactNumber: true,
      createdAt: true,
      orderItems: {
        select: {
          quantity: true,
          unitPrice: true,
          product: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  if (!trackedOrder) {
    return next(
      new AppError(
        "Sorry! the order could not be found. Please contact our help center if you are having difficulty tracking your order",
        404,
      ),
    );
  }
  return res.status(200).json({
    status: "success",
    data: trackedOrder,
  });
});
//for admins
export const getOrderAllAdmin = catchAsync(async (req, res, next) => {
  //sortClaue
  const sortCriteria = {
    lowestAmount: { totalAmount: "asc" },
    highestAmount: { totalAmount: "desc" },
    newest: { createdAt: "desc" },
    oldest: { createdAt: "asc" },
  };

  // sort by criteria or by default newest orders first
  const sortClause = sortCriteria[req.query.sortBy] || {
    createdAt: "desc",
  };
  //pagination clause
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  // handle error if skip>=total categories
  const orderCount = await prisma.order.count();
  if (skip >= orderCount) {
    return next(new AppError("Nothing to show. Are you alright?", 400));
  }

  //
  const orders = await prisma.order.findMany({
    //select fields
    select: {
      totalAmount: true,
      paymentStatus: true,
      orderStatus: true,
      shippingAddress: true,
      contactNumber: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      orderItems: {
        select: {
          quantity: true,
          unitPrice: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
              price: true,
            },
          },
        },
      },
    },

    //sorting
    orderBy: sortClause,

    //pagination
    take: limit,
    skip: skip,
  });
  //send response
  res.status(200).json({
    status: "success",
    count: orders.length,
    data: orders,
  });
});
//
export const getOrderAdmin = catchAsync(async (req, res, next) => {
  const singleOrder = await prisma.order.findUnique({
    where: {
      id: Number(req.params.id),
    },
    //select fields
    select: {
      totalAmount: true,
      paymentStatus: true,
      orderStatus: true,
      shippingAddress: true,
      contactNumber: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      orderItems: {
        select: {
          quantity: true,
          unitPrice: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
              price: true,
            },
          },
        },
      },
    },
  });
  if (!singleOrder) {
    return next(
      new AppError("Sorry! No order found with the matched Id.", 404),
    );
  }
  return res.status(200).json({
    status: "success",
    data: singleOrder,
  });
});
//
export const updateOrderAdmin = catchAsync(async (req, res, next) => {
  const Order_Update_Fields = [
    "orderStatus",
    "paymentStatus",
    "shippingAddress",
  ];
  // filter req.body for relevant fields
  const fieldsFiltered = filterObj(req.body, ...Order_Update_Fields);
  //console.log(fieldsFiltered);
  const updatedOrderResponse = await prisma.order.update({
    where: {
      id: Number(req.params.id),
    },
    data: fieldsFiltered,
    //select fields
    select: {
      totalAmount: true,
      paymentStatus: true,
      orderStatus: true,
      shippingAddress: true,
      contactNumber: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      orderItems: {
        select: {
          quantity: true,
          unitPrice: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
              price: true,
            },
          },
        },
      },
    },
  });

  // send final response
  return res.status(200).json({
    status: "success",
    data: updatedOrderResponse,
  });
});
