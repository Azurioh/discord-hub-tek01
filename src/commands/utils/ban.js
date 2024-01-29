import { PermissionsBitField } from 'discord.js';

function Ban(interaction, client)
{
    const banUser = interaction.options.getUser('user').id;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return interaction.reply({ content: "Tu dois avoir les permissions de bannir quelqu'un afin d'utiliser cette commande", ephemeral: true });
    }
    if (interaction.member.id === banUser) {
        return interaction.reply({ content: "Impossible de te ban toi même", ephemeral: true });
    }
    let reason = interaction.options.getString('raison');
    if (!reason) {
        reason = "No reason given";
    }
    interaction.guild.members.ban(banUser).then(() => {
        return interaction.reply({ content: `${interaction.options.getUser('user')} à été banni`, ephemeral: true });
    }).catch(() => {
        return interaction.reply({ content: `Impossible de bannir ${interaction.options.getUser('user')}`, ephemeral: true });
    });
}

const command = {
    name: "ban",
    description: "Ban the given user",
    options:[
        {
            name: "user",
            description: "L'utilisateur à ban",
            type:6,
            required: true,
        },
        {
            name: "raison",
            description: "La raison du ban",
            type:3,
        },
    ],
    default_member_permissions: 8,
    run: (interaction, client) => Ban(interaction, client)
}

export default command;