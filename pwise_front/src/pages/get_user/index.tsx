import styles from "./styles.module.scss";
const PaginaDoUsuario = () => {
  return (
    <>
      <main className={styles.container}>
        <h2>Usuarios ativos</h2>

        <div className={styles.userContainer}>
        <section className={styles.searchContainer}>
            <input type="text" placeholder="Pesquisar"/>
            <button>Buscar</button>

        </section>
          <section className={styles.BoxContainer}>
            <h3>
              <span>Matricula:</span> 01235
            </h3>
            <p>
              <span>Nome:</span> Cleosvaldo Antrosiano
            </p>
            <p>
              <span>Telefone:</span> (27)9999-9999
            </p>
            <p>
              <span>Contrato:</span> Caex
            </p>
            <p>
              <span>Username:</span> Antrosiano
            </p>
          </section>
        <section className={styles.buttonUsers}>
          <button>Adicionar</button>
          <button>Editar</button>
          <button>Deletar</button>
        </section>

        </div>
      </main>
    </>
  );
};
export default PaginaDoUsuario;
