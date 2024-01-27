
//express para criar o servidor
const express = require("express");
const app = express();

//cors para conseguir  acessar as requisições de outro domínio.
const cors = require("cors");

//body parser para  pegar os dados do corpo da requisição
const bodyParser = require("body-parser");

//definição da porta onde vai rodar nossa api
const port = 3001;

//firebase admin para  autenticação e manipulação dos usuários
var admin = require("firebase-admin");

//service acount para apontar para a credencial do  firebase
var serviceAccount = require("../services/credencial.json");

//initializeApp serve para 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


app.use(cors());// permite que todos os domínios acessem nossa API
app.use(bodyParser.json());// permite que nosso server entenda json no formato de string

//rota para verificar se a api esta rodando ok
app.get("/", async (req, res) => {
  res.json({ mensagem: "Api está no ar" }); // retorna uma mensagem em json
});

//rota get para recuperar os usuarios cadastrados no banco firestore
app.get("/usuarios", async (req, res) =>{
    try{
      const snapshot = await admin.firestore().collection('users').get() ;
      let usuarios = [];
      snapshot.forEach((doc)=> {
        usuarios.push(doc.data())
        })
        return res.status(200).send(usuarios);
        }catch(err){
          console.log(err);
          return res.status(400).send(err.message || 'Erro ao buscar usuario');
          }
          })


//rota get para recuperar as maquinas cadastradas no banco firestore
app.get('/maquina',async (req,res)=>{
  try{
    const snapshot = await admin.firestore().collection('machines').get() ;
    let usuarios = [];
    snapshot.forEach((doc)=> {
      usuarios.push(doc.data())
      })
      return res.status(200).send(usuarios);
      }catch(err){
        console.log(err);
        return res.status(400).send(err.message || 'Erro ao buscar usuario');
        }
            })
    


//agora um metodo get para recuperar os questionarios cadastrados
app.get('/check-lists',async (req,res)=>{
  try{
    const snapshot = await admin.firestore().collection('checklist').get() ;
    let usuarios = [];
    snapshot.forEach((doc)=> {
      usuarios.push(doc.data())
      })
      return res.status(200).send(usuarios);
      }catch(err){
        console.log(err);
        return res.status(400).send(err.message || 'Erro ao buscar usuario');
        }
            })
    


    
// Rota POST para cadastrar usuário no Firestore
app.post("/cad-user", async (req, res) => {
  try {
    const { matricula, nome, telefone, contrato, situacao, username } =req.body; // pega os campos do corpo da requisição
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
      
    }); // retorna um json com a mensagem de que o cadastro foi feito com sucesso 
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
