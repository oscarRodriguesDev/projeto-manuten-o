const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
var admin = require("firebase-admin");
var serviceAccount = require('../services/credencial.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(bodyParser.json()); 
  

// Rota POST para cadastrar usuário no Firestore
app.post("/cad-user", async (req, res) => {
  try {
    const { matricula, nome, telefone, contrato, situacao, username } = req.body;
    //qualquer problema nos dados retorna isso
    if (!matricula || !nome || !telefone || !contrato || !situacao || !username) {
      return res.status(400).json({ mensagem: "Campos inválidos. Todos os campos são obrigatórios." });
    }

    // Adicionar dados ao Firestore
    const usuarioRef = await admin.firestore().collection('users').add({
      matricula,
      nome,
      telefone,
      contrato,
      situacao,
      username
    });
    res.json({ mensagem: "Usuário cadastrado com sucesso!", usuarioId: usuarioRef.id });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno ao cadastrar usuário" });
  }
});



//endereço da api
app.listen(port, () => {
  console.log(`Servidor rodandos em http://localhost:${port}`);
});
