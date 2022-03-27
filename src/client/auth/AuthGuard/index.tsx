import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";

export type AuthStatus = "authenticated" | "unauthenticated";

type Props = {
  status: AuthStatus;
  redirectOnAuth?: string;
  redirectOnAnon?: string;
};

const AuthGuard: React.FC<Props> = ({
  children,
  status: requiredStatus,
  ...redirect
}) => {
  const router = useRouter();
  const { status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) return <></>;
  if (status !== requiredStatus) {
    if (status === "authenticated") {
      router.push(redirect.redirectOnAuth ? redirect.redirectOnAuth : "/");
      return null;
    }
    
    router.push(
      redirect.redirectOnAnon ? redirect.redirectOnAnon : "/auth/login"
    );
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
