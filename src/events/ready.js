const { servers_channel_id, twitch_url } = require('../../data/config.json');
const { ActivityType, EmbedBuilder } = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`[discord]: Connected to ${client.user.tag}\n[discord]: ${client.guilds.cache.size} servers - ${client.users.cache.filter(usr => !usr.bot).size} users`);
        client.user.setPresence({ activities: [{ name: 'Interchat', type: ActivityType.Streaming, url: twitch_url }] })
        await client.channels.cache.get(servers_channel_id).bulkDelete(99);
        for (const [id, srv] of client.guilds.cache) {
            let color = '#2c2f33';
            if (srv.iconURL()) {
                color = (await Vibrant.from(srv.iconURL().slice(0, srv.iconURL().length - '.webp'.length)).getPalette()).Vibrant.hex;
            }
            client.channels.cache.get(servers_channel_id).send({ embeds: [new EmbedBuilder()
                    .setColor(color)
                    .setAuthor({
                        iconURL: srv.iconURL(),
                        name: srv.name
                    })
                    .addFields([
                        {
                            name: 'Members',
                            value: `${srv.members.cache.filter(mmbr => mmbr.user.bot).size}`,
                            inline: true
                        }, {
                            name: 'Interchat',
                            value: `${srv.channels.cache.filter(chnl => chnl.name.toLowerCase().includes('interchat')).some(() => true)}`,
                            inline: true
                        }, {
                            name: 'Owner',
                            value: `${client.users.cache.get(srv.ownerId).tag}`,
                            inline: true
                        }
                    ])
                ] })
        }
    }
}