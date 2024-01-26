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
        <div>
          <h1>Gerenciando minhas manutenções com PWise</h1>
          <nav className={styles.menu}>
            <ul>
              <li>
                {" "}
                <Link href="/cad_user">Adcionar Usuario</Link>{" "}
              </li>
              <li>
                {" "}
                <Link href="/cad_machine">Adcionar Maquina</Link>{" "}
              </li>
              <li>
                {" "}
                <Link href="/check_list">Adcionar Check List</Link>{" "}
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
}
