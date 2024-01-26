import { useState } from "react";
import styles from "./styles.module.scss";

const Check = () => {
  // Estado para armazenar os dados do formulário
  const [dadosUsuario, setDadosUsuario] = useState({
    matricula: "",
    nome: "",
    telefone: "",
    contrato: "",
    situacao: "",
    username: "",
  });

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosUsuario((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Enviar dados para o servidor usando fetch ou uma biblioteca como axios
      const resposta = await fetch("http://localhost:3001/cad-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosUsuario),
      });

     alert("Dados do formulário enviados: "); // Adicionando este log

      if (resposta.ok) {
       alert("Usuário cadastrado com sucesso!");
       setDadosUsuario(
        {
          matricula: "",
          nome: "",
          telefone: "",
          contrato: "",
          situacao: "",
          username: "",
        }
       )
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
     
          <label>Matrícula:</label>
          <input
            type="text"
            name="matricula"
            value={dadosUsuario.matricula}
            onChange={handleChange}
          />
   
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={dadosUsuario.nome}
            onChange={handleChange}
          />
   
        <label>Telefone:</label>
        <input
          type="text"
          name="telefone"
          value={dadosUsuario.telefone}
          onChange={handleChange}
        />
    

        <label>Contrato:</label>
        <input
          type="text"
          name="contrato"
          value={dadosUsuario.contrato}
          onChange={handleChange}
        />
  



        <label>Situação:</label>
        <input
          type="text"
          name="situacao"
          value={dadosUsuario.situacao}
          onChange={handleChange}
        />
  

      


        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={dadosUsuario.username}
          onChange={handleChange}
        />
       

        <button type="submit">Cadastrar Usuário</button>
      </form>
    </div>
  </>
  );
};

export default Check;
