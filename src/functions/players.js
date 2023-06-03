const { EmbedBuilder } = require("discord.js");
const mc = require("minecraft-protocol");

const serverIP = "YOUR SERVER IP";
const serverPort = YOUR SERVER PORT;
const minecraftUsername = "YOUR MINECRAFT USERNAME";

function playersCommand(interaction) {
  mc.ping(
    {
      host: serverIP,
      port: serverPort,
      username: minecraftUsername,
    },
    (error, response) => {
      if (error) {
        console.log("Unable to reach the Minecraft server");
        const embed = new EmbedBuilder()
          .setColor("#ff0000")
          .setTitle("Player List Fetch Failed")
          .setDescription(
            "Failed to fetch the player list. The server may be offline or unreachable."
          );

        interaction.editReply({ embeds: [embed] });
      } else {
        const playerList = response.players.sample
          ? response.players.sample.map((player) => player.name).join("\n")
          : "No players online";

        const embed = new EmbedBuilder()
          .setColor("#00ff00")
          .setTitle("Player List")
          .setDescription(`Current Players:\n${playerList}`);

        interaction.editReply({ embeds: [embed] });
      }
    }
  );
}

module.exports = playersCommand;
