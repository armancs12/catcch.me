import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import { APIMiddleware } from "../@types";

const asAuthenticated: APIMiddleware = async (req, res, next) => {
  const session = await getSession({ req });
  if (session != null) {
    req.getUser = () => {
      return session.user;
    };

    return next();
  }

  throw createHttpError(401, "Access denied! Please login to continue.");
};

export default asAuthenticated;
