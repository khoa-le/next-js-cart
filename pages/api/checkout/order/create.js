import { v4 as uuidv4 } from "uuid";
import useAppContext, {
  mergeAppContext
} from "../../../../utils/middleware/appcontext";
import { PrismaClient } from "@prisma/client";

const OrdeCreate = async (req, res) => {
  const prisma = new PrismaClient();
  var cartToken = req.appcontext.hasOwnProperty("cart_token")
    ? req.appcontext.cart_token
    : "";
  if (!cartToken) {
    return res.json({ error: "emtpty cart" });
  }

  let cart = await prisma.cart.findOne({
    include: {
      cart_item: true
    },
    where: {
      mask_id: cartToken
    }
  });

  if (!cart) {
    return res.json({ error: "emtpty cart" });
  }

  console.log(cart.cart_item);
  let orderDetail = [];
  cart.cart_item.map(item => {
    orderDetail.push({
      attributes: item.options,
      product_name: item.product_name,
      quantity: item.qty,
      unit_cost: item.price,
      product: {
        connect: {
          product_id: item.product_id
        }
      }
    });
  });

  var date = new Date();
  var createOn = date.getTime();

  const body = JSON.parse(req.body);
  const result = await prisma.order.create({
    data: {
      total_amount: cart.grand_total,
      created_on: date,
      status: 1, //pending
      payment_method: body.payment_method,
      comments: body.comments,
      order_detail: {
        create: orderDetail
      },
      order_address: {
        create: {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          phone: body.phone,
          directory_region: {
            connect: {
              region_id: parseInt(body.regionId)
            }
          },
          directory_city: {
            connect: {
              city_id: parseInt(body.cityId)
            }
          },
          address: body.address
        }
      }
    }
  });

  //Clear cartoken
  cartToken = uuidv4();
  mergeAppContext(req, res, { cart_token: cartToken });

  return res.json(result);
};

export default useAppContext(OrdeCreate);
