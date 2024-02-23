console.log('[node]: Executing...');

//DEPENDENCIES
const { intents, discord_token } = require('../data/config.json');

//DISCORD
const { Client, Collection} = require('discord.js');
const client = new Client({ intents: [intents] });
client.commands = new Collection();

console.log('[discord]: Connecting to Discord client...');
client.login(discord_token).catch(error => {
    console.error(`[discord]: Cannot connect to Discord client : ${error}`)
})

//FS
const fs = require('fs');

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}