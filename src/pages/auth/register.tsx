import { NextPage } from "next";
import Link from "next/link";
import AuthForm from "@client/components/AuthForm";
import styles from "@client/styles/RegisterPage.module.css"
import { asUnauthenticated } from "@client/auth";

const RegisterPage: NextPage = () => {
  return (
    <main>
      <AuthForm
        className={styles.Form}
        title="Register"
        description={
          <>
            Register to use the app for free without credit card. You can update
            if you want to use it in more than 3 projects. (
            <Link href={"/about"}>Learn more</Link>)
          </>
        }
        providerButtonTextPrefix="Register with"
      />
      <p className={styles.FormFooter}>Already have an account? <Link href="/auth/login">Login</Link></p>
    </main>
  );
};

export default asUnauthenticated(RegisterPage);

