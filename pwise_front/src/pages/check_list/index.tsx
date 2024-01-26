import { useState } from "react";
import styles from "./styles.module.scss";

const NewCheckList = () => {
  const [dadosCheck, setDadosCheck] = useState({
    modelo: "",
    perguntas:[],
  });
  const [novoItem, setNovoItem] = useState("");


  const adicionarItem = () => {
    if (novoItem.trim() !== "") {
      setDadosCheck((prevDados) => ({
        ...prevDados,
        perguntas: [...prevDados.perguntas, novoItem]
      }));
      setNovoItem("");
    }
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
    <div className={styles.formularioContainer}>
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
  );
};

export default NewCheckList;
