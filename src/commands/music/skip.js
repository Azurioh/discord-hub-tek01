async function Skip(interaction, client) 
{
    const userVoiceChannel = interaction.user.voice.channel;
    const queue = await client.distube.getQueue(userVoiceChannel);

    if (!queue) {
        interaction.reply({ content: "Il n'y a aucune musique dans la file actuellement", ephemeral: true });
        return;
    }
    await queue.skip(userVoiceChannel);
    interaction.reply({ content: "La musique a bien été skip" });
    return;
}

const command = {
    name: "skip",
    description: "Skip une musique dans la file d'attente",
    music: true,
    queue: true,
    run: async (interaction, client) => Skip(interaction, client)
}

export default command;