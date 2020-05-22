import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import sendgridMail from '@sendgrid/mail';
import { findUserByUsername } from "../../../lib/user";

const forgot = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await findUserByUsername(username);
    //generate token
    const reset_password_token = crypto.randomBytes(16).toString("hex");
    //Update token to customer data
    const prisma = new PrismaClient();
    const updateUser = await prisma.customer.update({
      where: {
        customer_id: user.customer_id,
      },
      data: {
        reset_password_token: reset_password_token,
      },
    });

    debugger;
    //send email with token link
    const msg = {
      to: updateUser.email,
      from: process.env.EMAIL_FROM,
      subject: '[next-js-cart] Reset your password.',
      html: `
        <div>
          <p>Hello, ${updateUser.name}</p>
          <p>Please follow <a href="${process.env.WEB_URI}/user/reset/${reset_password_token}?email=${updateUser.email}">this link</a> to reset your password.</p>
        </div>
        `,
    };
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sendgridMail.send(msg);

    //response to user
    res
      .status(200)
      .send({ message: "We sent you a reset link to reset password" });
  } catch (error) {

    res.status(500).end(JSON.stringify(error));
  }
};
export default forgot;
