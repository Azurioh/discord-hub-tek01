import { EmbedBuilder } from "discord.js";

async function Queue(interaction, client) 
{
    const userVoiceChannel = interaction.user.voice.channel;
    const queue = await client.distube.getQueue(userVoiceChannel);
    const embed = new EmbedBuilder(
        {
            title: "File d'attente",
            color: 0x00FF00,
        }
    )

    if (!queue) {
        interaction.reply({ content: "Il n'y a aucune musique dans la file actuellement", ephemeral: true });
        return;
    }
    embed.setDescription(`${queue.songs.map((song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`);
    return;
}

const command = {
    name: "queue",
    description: "Affiche la file d'attente des musiques",
    music: true,
    queue: true,
    run: async (interaction, client) => Queue(interaction, client)
}

export default command;