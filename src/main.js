console.log('[node]: Executing...');

//DEPENDENCIES
const { intents, discord_token } = require('../data/config.json');

//DISCORD
const { Client, Collection, REST } = require('discord.js');
const client = new Client({ intents: [intents] });
const rest = new REST({ version: '9' }).setToken(discord_token);
client.commands = new Collection();

console.log('[discord]: Connecting to Discord client...');
client.login(discord_token).catch(error => {
    console.error(`[discord]: Cannot connect to Discord client : ${error}`);
})

//FS
const fs = require('fs');

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
let eventsCount = 0;
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
    eventsCount++;
}
console.log(`[fs]: Loaded ${eventsCount} events`);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let commandsCount = 0;
(async () => {
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        if (command.data) {
            try {
                await rest.put(`/applications/${client.user.id}/commands`, {body: [command.data]});
                commandsCount++;
            } catch (error) {
                console.error(`[discord]: Cannot load ${command.data.name} command : ${error}`);
            }
        }
    }
})()
console.log(`[fs]: Loaded ${commandsCount} commands`);