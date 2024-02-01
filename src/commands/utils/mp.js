import { PermissionsBitField } from 'discord.js';

function Mp(interaction, client)
{
    const mpUser = interaction.options.getUser('user').id;
    let message = interaction.options.getString('message');

    client.users.fetch(mpUser, false).then((user) => {
        user.send(message);
        return interaction.reply({ content: `MP bien envoyé à ${interaction.options.getUser('user')}`, ephemeral: true})
    }).catch(() => {
        return interaction.reply({ content: "Impossible d'envoyer un MP à cette personne", ephemeral: true})
    })
}

const command = {
    name: "mp",
    description: "MP the given user",
    options:[
        {
            name: "user",
            description: "L'utilisateur à qui envoyer le MP",
            type:6,
            required: true,
        },
        {
            name: "message",
            description: "Le message du MP",
            type:3,
            required: true,
        },
    ],
    default_member_permissions: 8,
    run: (interaction, client) => Mp(interaction, client)
}

export default command; 