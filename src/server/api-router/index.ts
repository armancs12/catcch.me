import nextConnect from "next-connect";
import { errorHandler } from "./middlewares";
import { NextApiRequest, NextApiResponse } from "next";

const isProduction = process.env.NODE_ENV === "production";

const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(405).end("Method not allowed!");
};

const onError = errorHandler({ exposeStack: !isProduction });

export default function apiRouter() {
  const apiRouter = nextConnect({
    onError,
    onNoMatch,
    disableResponseWait: true,
  });

  return apiRouter;
}
