import { NextApiRequest, NextApiResponse } from "next";
import { SessionUser, User } from "next-auth";
import { Middleware, NextConnect, ErrorHandler } from "next-connect";

export type APIRequest = NextApiRequest & {
  getUser(): SessionUser;
};

export type APIResponse = NextApiResponse;

export type APIRouter = NextConnect<APIRequest, APIResponse>;

export type APIMiddleware = Middleware<APIRequest, APIResponse>;

export type APIErrorHandler = ErrorHandler<APIRequest, APIResponse>;
