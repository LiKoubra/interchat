const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Return InterChat latency and uptime'),
    async execute(interaction, client) {
        await interaction.reply(client.ws.ping);
    }
}