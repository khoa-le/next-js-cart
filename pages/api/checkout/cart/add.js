import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import useAppContext, {
  mergeAppContext,
} from "../../../../utils/middleware/appcontext";

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const AddCart = async (req, res) => {
  var cartToken = req.appcontext.hasOwnProperty("cart_token")
    ? req.appcontext.cart_token
    : "";
  if (!cartToken) {
    cartToken = uuidv4();
    mergeAppContext(req, res, { cart_token: cartToken });
  }
  //find
  let cart = await prisma.cart.findOne({
    where: {
      mask_id: cartToken,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        mask_id: cartToken,
        grand_total: 0,
      },
    });
  }

  //add cart item
  const {
    body: { product_id, quantity, price, name, options },
  } = req;
  const cartItemPrice = quantity * price;

  //check product id is already in cart
  const existProductInCart = await prisma.cart_item.findOne({
    where: {
      UniqueProductOnCart: {
        product_id: product_id,
        cart_id: cart.cart_id,
      },
    },
  });

  if (!existProductInCart) {
    //create new item
    const cartItem = await prisma.cart_item.create({
      data: {
        cart: {
          connect: {
            cart_id: cart.cart_id,
          },
        },
        product: {
          connect: {
            product_id: product_id,
          },
        },
        qty: quantity,
        product_name: name,
        price: price,
        options: JSON.stringify(options),
      },
    });
  } else {
    //Increase quantity item
    const newQuantity = existProductInCart.qty + quantity;
    const cartItem = await prisma.cart_item.update({
      where: { item_id: existProductInCart.item_id },
      data: {
        qty: newQuantity,
      },
    });
  }

  //Update Cart total
  const newCart = await prisma.cart.update({
    include: {
      cart_item: {
        include: {
          product: true,
        },
      },
    },
    where: { cart_id: cart.cart_id },
    data: {
      grand_total: cart.grand_total + cartItemPrice,
      total_qty: cart.total_qty + quantity,
    },
  });

  return res.json(newCart);
};

export default useAppContext(AddCart);
