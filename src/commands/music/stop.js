async function Stop(interaction, client) 
{
    const userVoiceChannel = interaction.user.voice.channel;
    const queue = await client.distube.getQueue(userVoiceChannel);

    if (!queue) {
        interaction.reply({ content: "Il n'y a aucune musique dans la file actuellement", ephemeral: true });
        return;
    }
    await queue.stop(userVoiceChannel);
    interaction.reply({ content: "La musique a bien été arrêté" });
    return;
}

const command = {
    name: "stop",
    description: "Arrête la musique sur le bot",
    music: true,
    queue: true,
    run: async (interaction, client) => Stop(interaction, client)
}

export default command;