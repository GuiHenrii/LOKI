const venom = require("venom-bot");
const fs = require("fs");
const dialogo1 = require("./dialogos/dialogo1");

const contatos = JSON.parse(fs.readFileSync("contatos.json", "utf8"));

venom
  .create({
    session: "Disparo-BI", //name of session
  })
  .then((client) => start(client, 0))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client, index) {
  console.log("iniciado");

  if (index >= contatos.length) {
    console.log("Todas as mensagens foram enviadas!");
    return;
  }

  const contato = contatos[index];
  const telefone = contato.telefone;
  const nome = contato.nome;
  const id = contato.id;
  const mensagem = "Olá! Tudo bem?";

  const numero = "55" + telefone + "@c.us";

await client
    .sendText(numero, mensagem)
    .then(() => {
      console.log(
        `Mensagem enviada para ${nome} no número ${numero}, foram disparados ${id}`
      );
      setTimeout(() => {
        start(client, index + 1); // Chamar a função após 30 segundos
      }, 20000); // Aguardar 30 segundos
    })
    .catch((error) => {
      console.error(`Erro ao enviar mensagem para: ${numero}`, error);
      setTimeout(() => {
        start(client, index + 1); // Chamar a função após 30 segundos, mesmo em caso de erro
      }, 20000); // Aguardar 30 segundos
    });

  client.onMessage(async (message) => {
    const atendidos = JSON.parse(fs.readFileSync("atendimentos.json", "utf8"));
    const atendido = atendidos.tel;
    const cliente = message.from;

    if (atendido === cliente) {
      console.log("Cliente já atendido");
      return;
    }

    // Verifica se a mensagem é de grupo e se o número de telefone já está salvo no JSON
    if (message.isGroupMsg === false) {
      console.log("Creating new atendimento entry");
      const dados = {
        tel: message.from,
        nome: message.notifyName,
        atendido: 1,
      };
      dialogo1(client, message);
      salvaContato(dados);
    }
  });
}

function salvaContato(tempObj) {
  console.log("Início da função salvaContato");
  console.log("Objeto recebido:", tempObj);

  fs.readFile("atendimentos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo atendimentos.json", err);
      return;
    }
    console.log("Arquivo atendimentos.json lido com sucesso");
    const atendimentos = JSON.parse(data);

    atendimentos.push(tempObj);

    const json = JSON.stringify(atendimentos, null, 2);
    fs.writeFile("atendimentos.json", json, "utf8", (err) => {
      if (err) {
        console.error("Erro ao escrever o arquivo atendimentos.json", err);
        return;
      }
      console.log("Arquivo atendimentos.json salvo com sucesso");
    });
  });
}
