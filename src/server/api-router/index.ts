import nextConnect from "next-connect";
import { errorHandler } from "./middlewares";
import { NextApiRequest, NextApiResponse } from "next";
import { APIRouter } from "./@types";

const isProduction = process.env.NODE_ENV === "production";

const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(405).end("Method not allowed!");
};

const onError = errorHandler({ exposeStack: !isProduction });

export default function apiRouter() {
  const apiRouter: APIRouter = nextConnect({
    onError,
    onNoMatch,
    disableResponseWait: true,
  });

  apiRouter.use((req, res, next) => {
    req.getUser = () => {
      throw new Error("Please use asAuthenticated middleware in router first!");
    };
    next();
  });

  return apiRouter;
}
