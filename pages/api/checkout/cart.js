import { PrismaClient } from "@prisma/client";
import useAppContext from "../../../utils/middleware/appcontext";

const prisma = new PrismaClient();

const Cart = async (req, res) => {
  const cartToken = req.appcontext.hasOwnProperty("cart_token")
    ? req.appcontext.cart_token
    : "";

  if (!cartToken) {
    return res.json({});
  }

  const cart = await prisma.cart.findOne({
    include: {
      cart_item: {
        include: {
          product: true
        }
      }
    },
    where: {
      mask_id: cartToken
    }
  });
  return res.json(cart ? cart : {});
};
export default useAppContext(Cart);
