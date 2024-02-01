import { Events } from "discord.js";

function getFileToLoad(interaction, client)
{
    if (interaction.isChatInputCommand()) {
        if (!interaction.guild) {
            interaction.reply({ content: "Les commandes ne sont pas disponibles en message privé.", ephemeral: true });
            return;
        }
        return client.commands.get(interaction.commandName);
    }
    if (interaction.isButton()) {
        return client.buttons.get(interaction.customId);
    }
    return null;
}

function interactionCreate(interaction, client)
{
    let fileToLoad;

    if (interaction.guild) {
        interaction.user = interaction.guild.members.cache.get(interaction.user.id);
    }
    const userVoiceChannel = interaction.user.voice.channel;
    const botVoiceChannel = interaction.guild.members.me.voice.channel;
    fileToLoad = getFileToLoad(interaction, client);
    if (!fileToLoad) {
        interaction.reply({ content: "Cette action n'est pas disponible.", ephemeral: true });
        return;
    }
    if (fileToLoad.music) {
        if (!userVoiceChannel) {
            interaction.reply({ content: "Tu dois être dans un channel vocal afin d'utiliser des commandes de musiques", ephemeral: true });
            return;
        }
        if (botVoiceChannel && userVoiceChannel !== botVoiceChannel) {
            interaction.reply({ content: `Je joue déjà de la musique dans le channel <#${botVoiceChannel}>`, ephemeral: true });
            return;
        }
    }
    try {
        fileToLoad.run(interaction, client)
    } catch (err) {
        console.error(err);
        interaction.reply({ content: "Une erreur est survenue.", ephemeral: true });
    }
}

const event = {
    name: Events.InteractionCreate,
    run: async (interaction, client) => interactionCreate(interaction, client)
}

export default event;