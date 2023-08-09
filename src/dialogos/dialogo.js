async function dialogo(client, message) {
  const texto = "Você, corretor ou Imobiliária.\nA LOKIFÁCIL está aqui para auxiliá-lo!\n\nSomos uma solução digital projetada para facilitar a vida do locatário e da imobiliária.\n✅ Apresentamos uma locação sem fiador com alta segurança.\n⏱ Oferecemos uma aprovação automática em minutos!\n🤝 Conte com a Loki fácil para facilitar a locação de imóveis.\n\n🔽 Confira nossa apresentação!"

  await client
  .sendText(message.from, texto)
  .then(() => {
    client
          .sendFile(
            message.from,
            "./imagens/loki.pdf",
            "Comercial Lokifacil",
            ""
          )
          .then(async(result) => {
            await client
            .sendImage(
              message.from,
              "./imagens/criativoLoki.jpg",
              "",
              ""
            )
            .then((result) => {
              console.log("Send Image"); //return object success
            })
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}
module.exports = dialogo

