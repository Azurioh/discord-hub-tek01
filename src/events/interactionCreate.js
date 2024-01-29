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
    fileToLoad = getFileToLoad(interaction, client);
    if (!fileToLoad) {
        interaction.reply({ content: "Cette action n'est pas disponible.", ephemeral: true });
        return;
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