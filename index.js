const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const SOURCE_CHANNEL_ID = process.env.SOURCE_CHANNEL_ID;
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== SOURCE_CHANNEL_ID) return;

  const target = await client.channels.fetch(TARGET_CHANNEL_ID);
  if (!target) return;

  target.send(`📩 **${message.author.username}:**\n${message.content}`);
});

client.login(process.env.TOKEN);
