import styles from "./styles.module.scss";
const PaginaDasMaquinas = () => {
  return (
    <>
      <main className={styles.container}>
        <h2>Maquinas</h2>

        <div className={styles.userContainer}>
        <section className={styles.searchContainer}>
          
            <input type="text" placeholder="Pesquisar"/>
            <button>Buscar</button>
        </section>
          <section className={styles.BoxContainer}>
            <h3>
              <span>identificador:</span>DKMC2201
            </h3>
            <p>
              <span>Nome:</span>Retro Escavadeira
            </p>
            <p>
              <span>Modelo:</span>RE123654B22
            </p>
            <p>
              <span>Contrato:</span> Vale 
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
export default PaginaDasMaquinas;
