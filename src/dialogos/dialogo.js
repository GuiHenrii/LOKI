async function dialogo(client, message) {
  const texto = "Olá, sou Guilherme Rosa, consultor de negócios em tecnologia.\n\nDesenvolvemos uma ferramenta de atendimento automático para WhatsApp que une inteligência e humanização. Oferecemos suporte 20 horas por dia para atender você e sua equipe. *Diálogos personalizados*, pensados exclusivamente para sua empresa. \n\n Posso fazer uma breve apresentação?"

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