console.log('[node]: Executing...');

//DEPENDENCIES
const { intents, discord_token } = require('../data/config.json');

//DISCORD
const { Client } = require('discord.js');
const client = new Client({ intents: [intents] });
console.log('[discord]: Connecting to Discord client...'); client.login(discord_token).catch(error => { console.error(`[discord]: Cannot connect do Discord client : ${error}`) });