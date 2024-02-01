function Volume(interaction, client)
{
    const volume = interaction.options.getInteger("pourcentage");

    if (volume > 100 || volume < 1) {
        interaction.reply({ content: "Le nombre indiqué doit être entre 1 et 100", ephemeral: true });
        return;
    }
    client.distube.setVolume(interaction.guild, volume);
    interaction.reply({ content: `Volume réglé à ${volume}%` });
    return;
}

const command = {
    name: "volume",
    description: "Modifie le volume du bot",
    options: [
        {
            name: "pourcentage",
            description: "Pourcentage du volume souhaité",
            type: 4,
            required: true,
        }
    ],
    music: true,
    run: async (interaction, client) => Volume(interaction, client)
};

export default command;