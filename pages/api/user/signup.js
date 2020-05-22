import { createUser,findUserByUsername } from "../../../lib/user";

export default async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const user = findUserByUsername(username)
    if(user){
      res.status(401).end("Email have already signup")
    }
    await createUser({username, password});
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
