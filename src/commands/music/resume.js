async function Resume(interaction, client) 
{
    const userVoiceChannel = interaction.user.voice.channel;
    const queue = await client.distube.getQueue(userVoiceChannel);

    if (!queue) {
        interaction.reply({ content: "Il n'y a aucune musique dans la file actuellement", ephemeral: true });
        return;
    }
    await queue.resume(userVoiceChannel);
    interaction.reply({ content: "La musique a bien remise en route" });
    return;
}

const command = {
    name: "resume",
    description: "Remet en route la musique dans le channel",
    music: true,
    queue: true,
    run: async (interaction, client) => Resume(interaction, client)
}

export default command;