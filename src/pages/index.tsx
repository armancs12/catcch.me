import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Logo from "../components/Logo";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <Logo size="large" />
      <p className={styles.description}>Dead Simple Error Tracking</p>
    </main>
  );
};

export default Home;
