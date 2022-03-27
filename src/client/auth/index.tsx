import { NextPage } from "next";
import { Props as AuthProps } from "./AuthGuard";

export { default as AuthGuard } from "./AuthGuard";

type AuthPropsNotDefined<T> = T & { authStatus: undefined };
type AuthPropsDefined<T> = T & AuthProps;

export type WithAuthProps<T> = AuthPropsDefined<T> | AuthPropsNotDefined<T>;

type Options = Partial<Omit<AuthProps, "authStatus">>;

export const asAuthenticated = (Page: NextPage, options: Options = {}) => {
  const PageWithAuthProps = Page as AuthPropsDefined<NextPage>;
  PageWithAuthProps.authStatus = "authenticated";
  PageWithAuthProps.redirect = options.redirect ?? "/auth/login";
  return PageWithAuthProps;
};

export const asUnauthenticated = (Page: NextPage, options: Options = {}) => {
  const PageWithAuthProps = Page as AuthPropsDefined<NextPage>;
  PageWithAuthProps.authStatus = "unauthenticated";
  PageWithAuthProps.redirect = options.redirect ?? "/";
  return PageWithAuthProps;
};
