import { PermissionsBitField, Colors } from 'discord.js';

function Unmute(interaction, client)
{
    const unmuteUser = interaction.options.getUser('user');

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        return interaction.reply({ content: "Tu dois avoir les permissions de gérer les roles quelqu'un afin d'utiliser cette commande", ephemeral: true });
    }
    if (interaction.member.id === unmuteUser) {
        return interaction.reply({ content: "Impossible de te unmute toi même", ephemeral: true });
    }
    let reason = interaction.options.getString('raison');
    if (!reason) {
        reason = "No reason given";
    }
    const myRole = interaction.guild.roles.cache.find(role => role.name === "Mute");
    interaction.guild.members.cache.get(unmuteUser.id).roles.remove(myRole).then(() =>{
        return interaction.reply({ content: `${interaction.options.getUser('user')} à été unmute`, ephemeral: true });
    }).catch(() => {
        return interaction.reply({ content: `Impossible de unmute ${interaction.options.getUser('user')}`, ephemeral: true });
    });
}

const command = {
    name: "unmute",
    description: "Unmute the given user",
    options:[
        {
            name: "user",
            description: "L'utilisateur à unmute",
            type:6,
            required: true,
        },
    ],
    default_member_permissions: 8,
    run: (interaction, client) => Unmute(interaction, client)
}

export default command;