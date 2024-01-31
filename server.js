//Codigo para fazer as 4 direcoes

const { SerialPort } = require("serialport"); //é usado para a comunicação com a porta serial do Arduino
const WebSocket = require("ws"); //Biblioteca para cria servidor Websocket que permite a comunicaçao bilateral(dos dois lados)
const express = require("express"); //Biblioteca parab criar um servidor web
const http = require("http"); //Biblioteca para Cria um servidor http, para fazer a comunicaçao inicial e nao ser bloqueado por CORS (sistema de segurança web)

//Aqui estamos criando um servidor web
const app = express();
const server = http.createServer(app);
//
const wss = new WebSocket.Server({ server });

// Configuração da porta serial
const serialport = new SerialPort({
  path: "/dev/cu.usbmodem141101",
  baudRate: 9600,
});

// Quando uma conexão com o Construct é estabelecida
wss.on("connection", (ws) => {
  console.log("Construct conectado");

  // Envia os dados da porta serial para o construct

  serialport.on("data", (data) => {
    console.log(data);
    ws.send(data.toString());
  });

  // Quando perde a conexao com o construct
  ws.on("close", () => {
    console.log("Construct desconectado");
  });
});
// Inicializa o servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
