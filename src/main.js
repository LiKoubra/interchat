console.log('[node]: Executing...');

//DEPENDENCIES

const { intents, discord_token, discord_client_id } = require('../data/config.json');
const fs = require('fs');

//DISCORD

const { Client, Collection, REST, Routes } = require('discord.js');
const client = new Client({ intents: [intents] });
const rest = new REST().setToken(discord_token);
client.commands = new Collection();

console.log('[discord]: Connecting to Discord client...');
client.login(discord_token).catch(error => {
    console.error(`[discord]: Cannot connect to Discord client : ${error}`);
})

//FS
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

//COMMANDS
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
(async () => {
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        await rest.put(Routes.applicationCommands(discord_client_id), { body: command.data.body })
    }
})()


