async function Skip(interaction, client) 
{
    const userVoiceChannel = interaction.user.voice.channel;
    const queue = await client.distube.getQueue(userVoiceChannel);

    if (!queue) {
        interaction.reply({ content: "Il n'y a aucune musique dans la file actuellement", ephemeral: true });
        return;
    }
    try {
        await queue.skip(userVoiceChannel);
        interaction.reply({ content: "La musique a bien été skip" });
    } catch (err) {
        switch (err.code) {
            case 'NO_UP_NEXT':
                queue.stop(userVoiceChannel);
                interaction.reply({ content: "Impossible de skip la musique, la file d'attente est vide" });
                return;
            default:
                console.error(err);
                interaction.reply({ content: "Impossible de skip la musique" });
                return;
        }
    }
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