import { NextPage } from "next";
import { AuthStatus } from "./AuthGuard";

export { default as AuthGuard } from "./AuthGuard";

export type WithAuthProps<T> = T & Partial<{
    authStatus: AuthStatus;
    redirectOnAuth?: string;
    redirectOnAnon?: string;
}>

type Options = Partial<{
    redirect: string;
}>

export const asAuthenticated = (Page: NextPage, options: Options = {}) => {
  const PageWithAuthProps = Page as WithAuthProps<NextPage>;
  PageWithAuthProps.authStatus = "authenticated";
  PageWithAuthProps.redirectOnAuth = options.redirect;
  return PageWithAuthProps;
};

export const asUnauthenticated = (Page: NextPage, options: Options = {}) => {
  const PageWithAuthProps = Page as WithAuthProps<NextPage>;
  PageWithAuthProps.authStatus = "unauthenticated";
  PageWithAuthProps.redirectOnAnon = options.redirect;
  return PageWithAuthProps;
};
