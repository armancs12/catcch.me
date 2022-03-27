import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";

export type Props = {
  authStatus: "authenticated" | "unauthenticated";
  redirect: string;
};

const AuthGuard: React.FC<Props> = ({
  children,
  authStatus: requiredStatus,
  redirect,
}) => {
  const router = useRouter();
  const { status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) return <></>;
  
  if (status !== requiredStatus) {
    router.push(redirect);
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
