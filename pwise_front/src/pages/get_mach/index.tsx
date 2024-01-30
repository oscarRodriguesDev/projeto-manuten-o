import styles from "./styles.module.scss";
import UpdateButton from "@/components/botão/botao";
import { useState } from "react";
const PaginaDasMaquinas = () => {
  // Estado para armazenar os dados do formulário
  const [dadosMaquina, setDadosMaquina] = useState({
    identificador: "",
    nome: "",
    modelo: "",
    tipo: "",
    contrato: "",
  });

  //eventos
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
      console.log("Dados do formulário enviados: "); // Adicionando este log

      if (resposta.ok) {
        alert("Maquina cadastrada com sucesso!");
        setDadosMaquina({
          identificador: "",
          nome: "",
          modelo: "",
          tipo: "",
          contrato: "",
        });
      } else {
        console.log("Erro ao cadastrar Maquina!");
      }
    } catch (error) {
      console.log("Erro ao processar a requisição: ");
    }
  };

  return (
    <>
      <main className={styles.container}>
        <h2>Maquinas</h2>
        {/* apresentação dos dados das maquinas, vai ser dinamico */}
        <div className={styles.machContainer}>
          <section className={styles.searchContainer}>
            <input type="text" placeholder="Pesquisar" />
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

        {/*  formulario para adicionar novas maquinas ou editar as existentes */}

        <div className={styles.machCreate}>
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

            <label>contrato:</label>
            <input
              type="text"
              name="contrato"
              value={dadosMaquina.contrato}
              onChange={handleChange}
            />

            <button type="submit">Adicionar MAquina</button>
          </form>
        </div>
      </main>
    </>
  );
};
export default PaginaDasMaquinas;
