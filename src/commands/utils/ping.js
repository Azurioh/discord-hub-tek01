function Ping(interaction, client)
{
    interaction.reply({ content: `\`${client.ws.ping} ms\``, ephemeral: true });
    return;
}

const command = {
    name: "ping",
    description: "Return ping in the chat",
    run: (interaction, client) => Ping(interaction, client)
}

export default command;