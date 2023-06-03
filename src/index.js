require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "check") {
    await interaction.deferReply();
    const checkCommand = require("./functions/check");
    checkCommand(interaction);
  }

  if (interaction.commandName === "ping") {
    await interaction.deferReply();
    const pingCommand = require("./functions/ping");
    pingCommand(interaction);
  }

  if (interaction.commandName === "players") {
    await interaction.deferReply();
    const playersCommand = require("./functions/players");
    playersCommand(interaction);
  }
});

client.login(process.env.TOKEN);
