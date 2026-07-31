import { prisma } from "../config/db.js";
import AppError from "../utils/appError.js";

// create order service
export const createOrderService = async (userId, orderData) => {
  // interactive transaction
  return await prisma.$transaction(async (tx) => {
    //1) get the cart Items from Cart
    const cartItems = await tx.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });
    if (cartItems.length === 0) {
      throw new AppError("Cart is Empty. Try Adding Some.", 400);
    }

    //3) validate stock for every extant cart product
    for (const itemObj of cartItems) {
      if (itemObj.quantity > itemObj.product.stock) {
        throw new AppError(
          `${itemObj.product.name} has insufficient stock.`,
          400,
        );
      }
    }
    //4) calculate the total amount
    //-- sum of products
    const subTotal = cartItems.reduce((sum, currentItem) => {
      return sum + Number(currentItem.product.price) * currentItem.quantity;
    }, 0);
    // add shipping cost to get totalAmount
    //-- currently 2 options: inside dhaka and outside dhaka
    let shippingCost = 0;
    orderData.shippingZone === "Inside Dhaka"
      ? (shippingCost = 80)
      : (shippingCost = 150);
    const totalAmount = subTotal + shippingCost;

    //console.log(totalAmount);

    //5) make orderItems for Order
    const orderItemsArray = cartItems.map((cartItem) => {
      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        unitPrice: cartItem.product.price,
      };
    });
    //console.log(orderItemsArray);

    //6) create Order and 7) include OrderItems
    const newOrder = await tx.order.create({
      data: {
        userId: userId,
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        contactNumber: orderData.contactNumber,
        subTotal: subTotal,
        shippingCost: shippingCost,
        totalAmount: totalAmount,
        orderItems: {
          create: orderItemsArray,
        },
      },
      select: {
        id: true,
        subTotal: true,
        shippingCost: true,
        totalAmount: true,
        orderStatus: true,
        paymentMethod: true,
        paymentStatus: true,
        contactNumber: true,
        createdAt: true,
        user: {
          select: {
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
                name: true,
                slug: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    //8) update stock
    for (const item of cartItems) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }
    //9) clear Cart
    await tx.cart.deleteMany({
      where: {
        userId: userId,
      },
    });
    //10) return new order
    return newOrder;
  });
};
