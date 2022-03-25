import { NextPage } from "next";
import AuthForm from "@client/components/AuthForm";

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

export default LoginPage;
