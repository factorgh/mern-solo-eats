import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/myUser.js";

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (req, res, next) => {
  //1)check if authorization header exist
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(400).json({ message: "Unauthorized user" });
  }

  //2)Get user token from header
  const token = authorization.split(" ")[1];

  //3)Decode token  to get auth0Id
  const decoded = jwt.decode(token);
  const auth0Id = decoded.sub;

  ///4)check databasecif user  exist
  const user = await User.findOne({ auth0Id });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  ///append user deatils to req and next function
  req.userId = user._id.toString();
  req.auth0Id = auth0Id;

  next();
};
