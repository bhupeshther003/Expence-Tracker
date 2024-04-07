import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access;
  // console.log("token on verify" + req.cookies.access);
  if (!token) {
    return next(createError(401, "You are not authenticated")); // if theres no token
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // if is verify
    if (err) {
      return next(createError(403, "Token is not valid")); // if error, not valid, otherwise user
    } else {
      req.user = user;
    }
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log("req.user.isAdmin", req.user);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
        return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  // console.log("req::", req);
  verifyToken(req, res, () => {
    //console.log("req.user.isAdmi",req.user.isAdmin);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};
