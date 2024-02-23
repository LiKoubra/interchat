module.exports = {
    data: {
        name: 'ping',
        description: 'Return InterChat latency and uptime',
        options: []
    },
    async execute(interaction, client) {
        interaction.reply('pong lmaoooo');
    }
}