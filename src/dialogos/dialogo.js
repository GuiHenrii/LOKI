async function dialogo(client, message) {
  const texto = "*A²M - SERVIÇOS DE MENSAGENS INTELIGENTES*\nOlá, tudo bem? Me chamo Ritheli, sou consultora de negócios da empresaA²M, como vai?\n\n*Já se cansou de perder clientes por não ter um atendimento rápido e de qualidade?*\n*✅ Se destaque com um atendimento 24 horas!*\n*✅ Oferecemos um sistema totalmente personalizável para sua empresa...*\n\nFone: (34)99898-0126  - (34)98440-6710\nVisite nosso site: www.a2mprodutora.com.br/\nPara não receber nossas mensagens responda com *SAIR*.";

  await client
  .sendText(message.from, texto)
  .then(() => {
    console.log('Send Message'); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}
module.exports = dialogo