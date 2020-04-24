import nextCookie from "next-cookies";
import { serialize } from "cookie";

const jwt = require("jsonwebtoken");
const jwtSecret = "my-secret-key";
const setTokenOnCookie = (req, res, data) => {
  const token = jwt.sign(data, jwtSecret);
  res.setHeader("Set-Cookie", serialize("token", token, { path: "/" }));
  return token;
};

export const mergeAppContext = (req, res, data) => {
  const newData = Object.assign(req.appcontext, data);
  const token = setTokenOnCookie(req, res, newData);
};

const useAppContext = (handler) => (req, res) => {
  var { token } = nextCookie({ req: req });
  if (!token) {
    token = setTokenOnCookie(req, res,{});
  }

  //convert data hold in token to context of request
  var decoded = jwt.verify(token, jwtSecret);
  req.appcontext = decoded;
  return handler(req, res);
};
export default useAppContext;
