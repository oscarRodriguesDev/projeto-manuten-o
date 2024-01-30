import styles from "./styles.module.scss";
import { useState } from "react";

const CheckList = () => {
  //estados
  const [dadosCheck, setDadosCheck] = useState({
    modelo: "",
    perguntas: [],
  });

  const [novoItem, setNovoItem] = useState("");

  //eventos

  const adicionarItem = () => {
    if (novoItem === "") return;
    let novosPerguntas = dadosCheck.perguntas;
    novosPerguntas.push(novoItem); // no futuro tentar resolver isso
    setDadosCheck({ ...dadosCheck, perguntas: novosPerguntas });
    setNovoItem("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosCheck((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Enviar dados para o servidor usando fetch ou uma biblioteca como axios
      const resposta = await fetch("http://localhost:3001/cad-checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCheck),
      });

      if (resposta.ok) {
        alert("Máquina cadastrada com sucesso!");
        setDadosCheck({
          modelo: "",
          perguntas: [],
        });
      } else {
        alert("Erro ao cadastrar máquina!");
      }
    } catch (error) {
      alert("Erro ao processar a requisição: " + error);
    }
  };

  return (
    <>
      <main className={styles.container}>
        <h1>Check Lists</h1>
        <div className={styles.checklistData}>
          {/* barra de pesquisa */}
          <section className={styles.searchContainer}>
            <input type="text" placeholder="Pesquisar" />
            <button>Buscar</button>
          </section>
          <section className={styles.boxContainer}>
            <h2>
              <span>Modelo:</span> 1524587DK
            </h2>
            <h3>Check List</h3>
            <div className={styles.checklists}>
              <p>Pergunta 1</p>
              <button>editar</button>
              <button>Apagar</button>
            </div>
            <div className={styles.checklists}>
              <p>Pergunta 2</p>
              <button>editar</button>
              <button>Apagar</button>
            </div>
            <div className={styles.checklists}>
              <p>Pergunta 3</p>
              <button>editar</button>
              <button>Apagar</button>
            </div>
            <div className={styles.checklists}>
              <p>Pergunta 4</p>
              <button>editar</button>
              <button>Apagar</button>
            </div>
          </section>
          <section className={styles.buttonChecklist}>
            <button>Novo Check List</button>
            <button>Editar Check List</button>
            <button>Deletar Check List</button>
          </section>
        </div>

        <div className={styles.checklistCreate}>
          <form onSubmit={handleSubmit}>
            <label>
              Modelo:
              <input
                type="text"
                name="modelo"
                value={dadosCheck.modelo}
                onChange={handleChange}
              />
            </label>

            <div>
              <strong>Perguntas do Checklist:</strong>
              <ul>
                {dadosCheck.perguntas.map((pergunta, index) => (
                  <li key={index}>{pergunta}</li>
                ))}
              </ul>
            </div>

            <label>
              Nova Pergunta:
              <input
                type="text"
                value={novoItem}
                onChange={(e) => setNovoItem(e.target.value)}
              />
              <button type="button" onClick={adicionarItem}>
                Adicionar Pergunta
              </button>
            </label>

            <button type="submit">Cadastrar checkList</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CheckList;
