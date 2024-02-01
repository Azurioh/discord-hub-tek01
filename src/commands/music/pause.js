async function Pause(interaction, client) 
{
    const userVoiceChannel = interaction.user.voice.channel;
    const queue = await client.distube.getQueue(userVoiceChannel);

    if (!queue) {
        interaction.reply({ content: "Il n'y a aucune musique dans la file actuellement", ephemeral: true });
        return;
    }
    await queue.pause(userVoiceChannel);
    interaction.reply({ content: "La musique a bien été mise en pause" });
    return;
}

const command = {
    name: "pause",
    description: "Met la musique actuelle en pause",
    music: true,
    queue: true,
    run: async (interaction, client) => Pause(interaction, client)
}

export default command;