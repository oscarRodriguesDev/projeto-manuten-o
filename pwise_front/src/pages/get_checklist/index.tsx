import styles from "./styles.module.scss";
const PaginaDasMaquinas = () => {
  return (
    <>
      <main className={styles.container}>
        <h2>Check List</h2>

        <div className={styles.userContainer}>
        <section className={styles.searchContainer}>
          
            <input type="text" placeholder="Pesquisar"/>
            <button>Buscar</button>
        </section>
          <section className={styles.BoxContainer}>
           
            <p>
              <span>Modelo:</span>RE123654B22
            </p>
            <section className={styles.containerPerguntas}>
               <ul>
                <li>Pergunta 1</li>
                <button>deletar</button>
                <button>editar</button>
               
               </ul>
               <ul>
                <li>Pergunta 2</li>
                <button>deletar</button>
                <button>editar</button>
               
               </ul>
               <ul>
                <li>Pergunta 3</li>
                <button>deletar</button>
                <button>editar</button>
               
               </ul>
               <ul>
                <li>Pergunta 4</li>
                <button>deletar</button>
                <button>editar</button>
               
               </ul>
               <ul>
                <li>Pergunta 5</li>
                <button>deletar</button>
                <button>editar</button>
               
               </ul>
               <ul>
                <li>Pergunta 6</li>
                <button>deletar</button>
                <button>editar</button>
               
               </ul>
              
            </section>

          
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
