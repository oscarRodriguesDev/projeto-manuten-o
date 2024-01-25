const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3001;
var admin = require("firebase-admin");
var serviceAccount = require('../services/credencial.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
//dados ficticios do check list
app.use(bodyParser.json()); // Middleware para processar JSON no corpo das requisições

checkList =  [{
    modelo:'b250',
    data:'dd/mm/aaaa',
    perguntas:{
        pergunta1:'sim',
        pergunta2:'sim',
        pergunta3:'nao',
        pergunta4:'sim',
        pergunta5:'sim',
        pergunta6:'não',
        pergunta7:'sim',
    }
}]


// Dados fictícios das maquinas, vai para uma chave no banco de dados
const dadosMaquina = [
  {
    codigo: "13456",
    descrição: "maquina de limpeza",
    modelo: "B250",
    tensao: "220",
  },

  // Adicione mais dados conforme necessário
];

// Dados fictícios para manutenção, vai para uma chave no banco de dados
const dadosUsuario = [
  {
    matricula: "123456",
    nome: "Cleosvaldo",
    telefone: "2798765432",
    contrato: "Arcelor",
    situacao: "ativo",
    username: "asdf14",
  }, //3 meses desativado exclui
  // Adicione mais dados conforme necessário
];
// Dados fictícios para manutenção, vai para uma chave no banco de dados
const dadosVeiculo = [
  { placa: "DSG1R72", modelo: "Gol", ano: "2022", odometro: "0" }, //3 meses desativado exclui
  // Adicione mais dados conforme necessário
];

const manutenção_maquinas = [
  {
    manutencao: {
      responsavel: "nomeOperador",
      data: "01/01/2024",
      maquina: "",
    },
    checkList: {},
  },
];

// Rota get para recuperar dados de manutenção
app.get("/", (req, res) => {
  res.json({ mensagem: "nenhum dado para mostrar" });
});

/* 
 Rotas para consulta de usuarios, maquinas e veiculos
 */
app.get("/maquinas", (req, res) => {
  res.json(dadosMaquina);
});

app.get("/usuarios", (req, res) => {
  res.json(dadosUsuario);
});

app.get("/veiculos", (req, res) => {
  res.json(dadosVeiculo);
});

// Rota post para cadastrar maquinas
app.post("/cadastro-maquina:codigo", (req, res) => {
  res.json(dadosManutencao);
});

// Rota POST para cadastrar usuário no Firestore
app.post("/cad-user", async (req, res) => {
  try {
    const { matricula, nome, telefone, contrato, situacao, username } = req.body;

    // Adicionar dados ao Firestore
    await admin.firestore().collection('usuarios').add({
      matricula,
      nome,
      telefone,
      contrato,
      situacao,
      username
    });

    // Adicionar usuário aos dados fictícios (opcional)
    dadosUsuario.push({
      matricula,
      nome,
      telefone,
      contrato,
      situacao,
      username
    });

    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno ao cadastrar usuário" });
  }
});

// Rota post para cadastrar veiculos
app.post("/cadastro-usuario:matricula", (req, res) => {
  res.json(dadosManutencao);  
});
/* Rotas que vamos precisar


rota para fazer um check list
*/

//rota para alterar a situação do usuario
app.put("/usuarios/:matricula/situacao", (req, res) => {
    const matricula = req.params.matricula;
    const { situacao } = req.body;
    const usuario = dadosUsuario.find((user) => user.matricula === matricula);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    usuario.situacao = situacao;
    res.json(usuario);
  });
  

  //rota para alterar o telefone do usuario
app.put("/usuarios/:matricula/telefone", (req, res) => {
    const matricula = req.params.matricula;
    const { situacao } = req.body;
    const usuario = dadosUsuario.find((user) => user.telefone === telefone);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    usuario.telefone = telefone;
    res.json(usuario);
  });
  
// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodandos em http://localhost:${port}`);
});
