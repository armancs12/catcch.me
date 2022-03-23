import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <Image width={92} height={92} src="/icons/octopus.svg" alt="catcch.me logo" />
        <span>catcch.me</span>
      </h1>
      <p className={styles.description}>Dead Simple Error Tracking</p>
    </main>
  );
};

export default Home;
