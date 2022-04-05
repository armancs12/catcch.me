import createError, { HttpError, isHttpError } from "http-errors";
import { ZodError } from "zod";
import { APIErrorHandler } from "../@types";

declare module "http-errors" {
  interface HttpError<N extends number = number> {
    formErrors: N extends 400 ? ZodError["formErrors"] : undefined;
  }
}

const getAsHttpError = (error: any) => {
  if (isHttpError(error)) {
    return error as HttpError;
  }

  if (error instanceof ZodError) {
    const httpError = createError(400);
    httpError.formErrors = error.flatten();
    return httpError;
  }

  return createError(error);
};

const errorHandler = (args: { exposeStack: boolean }) => {
  const onError: APIErrorHandler = (error, req, res) => {
    const serverErrorMessage = "Something went wrong!";
    const httpError = getAsHttpError(error);

    if (httpError.headers) {
      Object.entries(httpError.headers).forEach(([key, value]) =>
        res.setHeader(key, value)
      );
    }

    res.status(httpError.status).json({
      errorMessage:
        httpError.status !== 500 ? httpError.message : serverErrorMessage,
      formErrors: httpError.formErrors,
      stack: args.exposeStack ? error.stack : undefined,
    });
  };

  return onError;
};

export default errorHandler;
