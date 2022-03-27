import { NextPage } from "next";
import AuthForm from "@client/components/AuthForm";
import { asUnauthenticated } from "@client/auth";

const LoginPage: NextPage = () => {
  return (
    <main>
      <AuthForm
        title="Login"
        providerButtonTextPrefix="Login with"
      />
    </main>
  );
};

export default asUnauthenticated(LoginPage);
