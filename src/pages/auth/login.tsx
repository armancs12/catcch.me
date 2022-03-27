import { NextPage } from "next";
import AuthForm from "@client/components/AuthForm";
import { asUnauthenticated } from "@client/auth";

const LoginPage: NextPage = () => {
  return (
    <main>
      <AuthForm
        title="Login"
        emailButtonText="Login with Email"
        googleButtonText="Login with Google"
      />
    </main>
  );
};

export default asUnauthenticated(LoginPage);
