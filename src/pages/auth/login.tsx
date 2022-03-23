import { NextPage } from "next";
import AuthForm from "../../components/AuthForm";

const LoginPage: NextPage = () => {
  return (
    <main>
        <AuthForm title="Login" />
    </main>
  );
};

export default LoginPage;