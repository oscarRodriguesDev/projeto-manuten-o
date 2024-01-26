import { useState } from "react";
import styles from "./styles.module.scss";

const NewMachine = () => {
  // Estado para armazenar os dados do formulário
  const [dadosMaquina, setDadosMaquina] = useState({
    identificador: "",
    nome: "",
    modelo: "",
    tipo: "",
  });

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosMaquina((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Enviar dados para o servidor usando fetch ou uma biblioteca como axios
      const resposta = await fetch("http://localhost:3001/cad-machines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosMaquina),
      });

      alert("Dados do formulário enviados: "); // Adicionando este log

      if (resposta.ok) {
        alert("Usuário cadastrado com sucesso!");
        setDadosMaquina({
          identificador: "",
          nome: "",
          modelo: "",
          tipo: "",
        });
      } else {
        alert("Erro ao cadastrar usuário!");
      }
    } catch (error) {
      alert("Erro ao processar a requisição: ");
    }
  };

  return (
    <>
      <div className={styles.formularioContainer}>
        <form onSubmit={handleSubmit}>
          <label>Serial:</label>
          <input
            type="text"
            name="identificador"
            value={dadosMaquina.identificador}
            onChange={handleChange}
          />

          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={dadosMaquina.nome}
            onChange={handleChange}
          />

          <label>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={dadosMaquina.modelo}
            onChange={handleChange}
          />

          <label>Tipo:</label>
          <input
            type="text"
            name="tipo"
            value={dadosMaquina.tipo}
            onChange={handleChange}
          />

          <button type="submit">Cadastrar Maquina</button>
        </form>
      </div>
    </>
  );
};

export default NewMachine;
