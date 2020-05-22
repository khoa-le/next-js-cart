import { findUserByUsername,resetPassword } from "../../../lib/user";

export default async function reset(req, res) {
  try {
    const { email, password, token } = req.body;
    const user = await findUserByUsername(email);
    if (!user) {
      res.status(401).end("Email does not exist");
    }
    if (user.reset_password_token != token) {
      res.status(401).end("Token invalid or expired");
    }
    await resetPassword({ username:email, password });
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
