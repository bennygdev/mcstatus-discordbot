const { EmbedBuilder } = require("discord.js");
const mc = require("minecraft-protocol");

const serverIP = "YOUR SERVER IP";
const serverPort = YOUR SERVER PORT;
const minecraftUsername = "YOUR MINECRAFT USERNAME";

let isServerOnline = false;

function checkCommand(interaction) {
  const session = mc.createClient({
    host: serverIP,
    port: serverPort,
    username: minecraftUsername,
  });

  session.on("connect", () => {
    if (!isServerOnline) {
      console.log("Minecraft server is Online");
      const embed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("Minecraft Server Status")
        .setDescription("The server is currently online.");

      interaction.editReply({ embeds: [embed] });
      isServerOnline = true;
    }
    session.end();
  });

  session.on("error", (error) => {
    if (error.code === "ETIMEDOUT") {
      console.log("Unable to reach the server");
      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("Minecraft Server Status")
        .setDescription("The server is currently offline or unreachable.");

      interaction.editReply({ embeds: [embed] });
      isServerOnline = false;
    } else {
      console.error(
        "An error occurred while connecting to the Minecraft server:",
        error
      );
    }
  });
}

module.exports = checkCommand;
