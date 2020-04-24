import useAppContext from "../../../../../utils/middleware/appcontext";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DeleteCartByID = async (req, res) => {
  const { id } = req.query;
  const deleteItem = await prisma.cart_item.delete({
    where: {
      item_id: parseInt(id)
    }
  });

  //Update Cart total
  const cart = await prisma.cart.findOne({
    where: {
      cart_id: deleteItem.cart_id
    }
  });

  const newGrandTotal = cart.grand_total - deleteItem.price * deleteItem.qty;
  const newTotalQty = cart.total_qty - deleteItem.qty;
  const newCart = await prisma.cart.update({
    include: {
      cart_item: {
        include: {
          product: true
        }
      }
    },
    where: { cart_id: cart.cart_id },
    data: {
      grand_total: newGrandTotal,
      total_qty: newTotalQty > 0 ? newTotalQty : 0
    }
  });

  return res.json(newCart);
};

export default useAppContext(DeleteCartByID);
