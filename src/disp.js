const venom = require("venom-bot");
const fs = require("fs");
const dialogo1 = require("./dialogos/dialogo");

const sessionName = "Disparo-BI";
const contatos = JSON.parse(fs.readFileSync("contatos.json", "utf8"));


venom.create({ session: sessionName })
  .then((client) => start(client, 0))
  .catch((error) => {
    console.error('Erro ao criar o cliente Venom:', error); // Termina o processo com um código de erro
  });

function start(client, index) {
  console.log("Disparador Iniciado");

  if (index >= contatos.length) {
    console.log("Todas as mensagens foram enviadas!");
  }else{

  const contato = contatos[index];
  const telefone = contato.telefone;
  const nome = contato.nome;
  const id = contato.id;
  const mensagem = "Olá! Tudo bem??"; //É o texto usado para o primeiro envio

  const numero = "55" + telefone + "@c.us";

  try {
    client.sendText(numero, mensagem)
    .then(() => {
      console.log(`Mensagem enviada para ${nome} no número ${numero}, foram disparados ${id}`);
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
    setTimeout(() => {
      start(client, index + 1); // Chamar a função após 30 segundos
    }, 20000); // Aguardar 30 segundos
  } catch (error) {
    console.error(`Erro ao enviar mensagem para: ${numero}`, error);
    setTimeout(() => {
      start(client, index + 1); // Chamar a função após 30 segundos, mesmo em caso de erro
    }, 20000); // Aguardar 30 segundos
  }
}

  client.onMessage(async (message) => {
    console.log(message)
    try{
        // Verificar se a mensagem é do sistema do WhatsApp
      if (!message.type || message.content === 'Esta mensagem foi excluída') {
        // Ignorar mensagens do sistema ou mensagens excluídas
          console.log('Mensagem do sistema ou mensagem excluída recebida:', message.body);
          return;
      }
      if (message.isGroupMsg === false && message.type === 'chat') {
        const cliente = message.from;
        const encontrado = await pesquisarNoArquivoJSON(cliente);
        if (encontrado != undefined) {
          console.log("Cliente atendido");
        } else {
          console.log("Criando nova entrada de atendimento");
          const dados = {
            tel: cliente,
            nome: message.notifyName,
            atendido: 1,
          };
          await dialogo1(client, message);
          salvaContato(dados);
        }
      }
    }catch(error){
      console.log("Resultado do erro" + error)
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

async function pesquisarNoArquivoJSON(valorDesejado) {
  const atendimentosFile = './atendimentos.json';

  try {
    const data = await fs.promises.readFile(atendimentosFile, 'utf8');
    const jsonContent = JSON.parse(data);
    const encontrado = jsonContent.find(item => item.tel === valorDesejado);
    console.log(encontrado);
    return encontrado;
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Arquivo não encontrado');
      return undefined;
    } else {
      console.error(err);
      throw err;
    }
  }
}