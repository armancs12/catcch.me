import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import { APIMiddleware } from "../@types";

const asAuthenticated: APIMiddleware = (req, res, next) => {
    const session = getSession({ req });
    if (session != null) {
        return next();
    }

    throw createHttpError(401, "Access denied! Please login to continue.");
};

export default asAuthenticated;
