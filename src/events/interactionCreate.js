const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {

    }
}