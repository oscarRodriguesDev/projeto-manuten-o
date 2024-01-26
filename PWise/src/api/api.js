const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
var admin = require("firebase-admin");
var serviceAccount = require("../services/credencial.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(bodyParser.json());

//rota inicial da api
app.get("/", async (req, res) => {
  res.json({ mensagem: "Api está no ar" });
});

// Rota POST para cadastrar usuário no Firestore
app.post("/cad-user", async (req, res) => {
  try {
    const { matricula, nome, telefone, contrato, situacao, username } =
      req.body;
    //qualquer problema nos dados retorna isso
    if (
      !matricula ||
      !nome ||
      !telefone ||
      !contrato ||
      !situacao ||
      !username
    ) {
      return res
        .status(400)
        .json({
          mensagem: "Campos inválidos. Todos os campos são obrigatórios.",
        });
    }
    // Adicionar dados ao Firestore
    const usuarioRef = await admin.firestore().collection("users").add({
      matricula,
      nome,
      telefone,
      contrato,
      situacao,
      username,
    });
    res.json({
      mensagem: "Usuário cadastrado com sucesso!",
      
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno ao cadastrar usuário" });
  }
});



// Rota POST para cadastrar maquinas no Firestore
app.post("/cad-machines", async (req, res) => {
  try {
    const {identificador,nome, modelo, tipo} =
      req.body;
    //qualquer problema nos dados retorna isso
    if (
      !identificador ||
      !nome||
      !modelo ||
      !tipo
     
    ) {
      return res
        .status(400)
        .json({
          mensagem: "Campos inválidos. Todos os campos são obrigatórios.",
        });
    }
    // Adicionar dados ao Firestore
    const machineRef= await admin.firestore().collection("machines").add({
      identificador,
      nome,
      modelo,
      tipo,
     
    });
    res.json({
      mensagem: "maquina cadastrado com sucesso!",
     
    });
  } catch (error) {
    console.error("Erro ao cadastrar maquina:", error);
    res.status(500).json({ mensagem: "Erro interno ao cadastrar maquina" });
  }
});



//uma rota para cadastrar os questionarios por modelo de maquina
app.post("/cad-checklist", async (req, res) => {
  try {
    const {modelo,perguntas} =
      req.body;
    //qualquer problema nos dados retorna isso
    if (
      !modelo ||
      !perguntas
    ) {
      return res
        .status(400)
        console.log(modelo,perguntas)
        .json({
          mensagem: "Campos inválidos. Todos os campos são obrigatórios.",
        });
    }
    // Adicionar dados ao Firestore
    const machineRef= await admin.firestore().collection("checklist").add({
     modelo,
     checklist: perguntas,
     
    });
    res.json({
      mensagem: "Novo check list adcionado com sucesso!",
     
    });
  } catch (error) {
    console.error("Erro ao criar check list:", error);
    res.status(500).json({ mensagem: "Erro interno ao criar check list" });
  }
});


//endereço da api
app.listen(port, () => {
  console.log(`Servidor rodandos em http://localhost:${port}`);
});
