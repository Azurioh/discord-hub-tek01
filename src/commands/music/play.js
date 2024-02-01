function Play(interaction, client)
{
    const userQuery = interaction.options.getString("musique");
    const userVoiceChannel = interaction.user.voice.channel;

    try {
        client.distube.play(userVoiceChannel, userQuery, { textChannel: interaction.channel, member: interaction.user });
        interaction.reply({ content: "Votre demande de musique à bien été reçu", ephemeral: true });
        return;
    } catch (err) {
        console.error(err);
        interaction.reply({ content: `Impossible de jouer de la musique pour le moment... Veuillez réessayer ultérieurement`, ephemeral: true });
        return;
    }
}

const command = {
    name: "play",
    description: "Joue de la musique dans un channel",
    type: 1,
    options: [
        {
            name: "musique",
            description: "Titre ou URL de la musique",
            type: 3,
            required: true,
        }
    ],
    music: true,
    run: async (interaction, client) => Play(interaction, client),
};

export default command;