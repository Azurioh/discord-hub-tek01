import { PermissionsBitField } from 'discord.js';

function Kick(interaction, client)
{
    const kickUser = interaction.options.getUser('user').id;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        return interaction.reply({ content: "Tu dois avoir les permissions de kick quelqu'un afin d'utiliser cette commande", ephemeral: true });
    }
    if (interaction.member.id === kickUser) {
        return interaction.reply({ content: "Impossible de te kick toi même", ephemeral: true });
    }
    let reason = interaction.options.getString('raison');
    if (!reason) {
        reason = "No reason given";
    }
    interaction.guild.members.kick(kickUser).then(() => {
        return interaction.reply({ content: `${interaction.options.getUser('user')} à été kick`, ephemeral: true });
    }).catch(() => {
        return interaction.reply({ content: `Impossible de kick ${interaction.options.getUser('user')}`, ephemeral: true });
    });
}

const command = {
    name: "kick",
    description: "kick the given user",
    options:[
        {
            name: "user",
            description: "L'utilisateur à kick",
            type:6,
            required: true,
        },
        {
            name: "raison",
            description: "La raison du kick",
            type:3,
        },
    ],
    default_member_permissions: 8,
    run: (interaction, client) => Kick(interaction, client)
}

export default command;