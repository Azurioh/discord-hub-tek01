import { PermissionsBitField } from 'discord.js';

function Unban(interaction, client)
{
    const unbanUser = interaction.options.getUser('user').id;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return interaction.reply({ content: "Tu dois avoir les permissions de bannir quelqu'un afin d'utiliser cette commande", ephemeral: true });
    }
    interaction.guild.members.unban(unbanUser).then(() => {
        return interaction.reply({ content: `${interaction.options.getUser('user')} à été débanni`, ephemeral: true });
    }).catch(() => {
        return interaction.reply({ content: `Impossible de débannir ${interaction.options.getUser('user')}`, ephemeral: true });
    });
}

const command = {
    name: "unban",
    description: "unban the given user",
    options:[
        {
            name: "user",
            description: "L'utilisateur à déban",
            type:6,
            required: true,
        },
    ],
    default_member_permissions: 8,
    run: (interaction, client) => Unban(interaction, client)
}

export default command;