import type { NextPage } from "next";
import styles from "@client/styles/Home.module.css";
import Logo from "@client/components/Logo";
import { asUnauthenticated } from "@client/auth";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <Logo size="large" />
      <p className={styles.description}>Dead Simple Error Tracking</p>
    </main>
  );
};

export default asUnauthenticated(Home, {
  redirect: "/dashboard"
});
