import { NextApiRequest, NextApiResponse } from "next";
import { SessionUser, User } from "next-auth";
import { Middleware, NextConnect, ErrorHandler } from "next-connect";

type Request = NextApiRequest & {
  getUser(): SessionUser;
};

type Response = NextApiResponse;

export type APIRouter = NextConnect<Request, Response>;

export type APIMiddleware = Middleware<Request, Response>;

export type APIErrorHandler = ErrorHandler<Request, Response>;
