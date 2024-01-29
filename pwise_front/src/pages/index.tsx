import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/home.module.scss";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Pwise- Home</title>
      </Head>
    <main className={styles.container}>
      <h1>Pagina Home</h1>
    </main>
    </>
  );
}
