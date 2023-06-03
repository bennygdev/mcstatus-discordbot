const { EmbedBuilder } = require("discord.js");
const mc = require("minecraft-protocol");

const serverIP = "YOUR SERVER IP";
const serverPort = YOUR SERVER PORT;

function pingCommand(interaction) {
  const session = mc.ping({ host: serverIP, port: serverPort });

  session
    .then((response) => {
      const ping = response.latency;
      const embed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("Server Ping")
        .setDescription(`Server ping: ${ping}ms`);

      interaction.editReply({ embeds: [embed] });
    })
    .catch((error) => {
      console.error("An error occurred while pinging the server:", error);
      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("Server Ping Failed")
        .setDescription("Unable to ping the server.");

      interaction.editReply({ embeds: [embed] });
    });
}

module.exports = pingCommand;
