import styles from "./styles.module.scss";
import Link from "next/link";

const Menu = () => {
  return (
    <>
      <main className={styles.container}>
        <div>
          <h1>Gerenciando minhas manutenções com PWise</h1>
          <nav className={styles.menu}>
            <ul>
              {/* menu para acessar a pagina de usuarios */}
              <li>
                {" "}
                <Link href="/">Home</Link>{" "}
              </li>
              <li>
                {" "}
                <Link href="/get_user">Usuarios</Link>{" "}
              </li>

              {/* menu para acessar as maquinas */}
              <li>
                {" "}
                <Link href="/get_mach">Maquinas</Link>{" "}
              </li>

              {/* menu para acessar os check listo */}
              <li>
                {" "}
                <Link href="/get_checklist">CheckLists</Link>{" "}
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
};

export default Menu;
