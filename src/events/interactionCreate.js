const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if (!interaction.isCommand() || !client.commands.has(interaction)) return {}
        await client.commands.get(interaction).execute(interaction);
    }
}