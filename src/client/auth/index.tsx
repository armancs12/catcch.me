import { NextPage } from "next";
import { AuthStatus } from "./AuthGuard";

export { default as AuthGuard } from "./AuthGuard";

export type WithAuthProps<T> = T & Partial<{
    authStatus: AuthStatus;
    redirectOnAuth?: string;
    redirectOnAnon?: string;
}>

export const asAuthenticated = (Page: NextPage) => {
    const PageWithAuthProps = Page as WithAuthProps<NextPage>;
    PageWithAuthProps.authStatus = "authenticated" 
    return PageWithAuthProps
}

export const asUnauthenticated = (Page: NextPage) => {
    const PageWithAuthProps = Page as WithAuthProps<NextPage>;
    PageWithAuthProps.authStatus = "unauthenticated" 
    return PageWithAuthProps
}