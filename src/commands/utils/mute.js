import { PermissionsBitField, Colors } from 'discord.js';

function Mute(interaction, client)
{
    const muteUser = interaction.options.getUser('user').id;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        return interaction.reply({ content: "Tu dois avoir les permissions de gérer les roles quelqu'un afin d'utiliser cette commande", ephemeral: true });
    }
    if (interaction.member.id === muteUser) {
        return interaction.reply({ content: "Impossible de te mute toi même", ephemeral: true });
    }
    let reason = interaction.options.getString('raison');
    if (!reason) {
        reason = "No reason given";
    }
    const role = interaction.guild.roles.cache.find(role => role.name === "Mute");
    if (!role){
        interaction.guild.roles.create({
            name: 'Mute',
            color: Colors.Grey,
            permissions: [],
            reason: 'Need of a mute role',
        })
        //role.setPermissions(0n)
    }
    const myRole = interaction.guild.roles.cache.find(role => role.name === "Mute");
    interaction.guild.members.cache.get(muteUser).roles.add(myRole).then(() =>{
        return interaction.reply({ content: `${interaction.options.getUser('user')} à été mute`, ephemeral: true });
    }).catch(() => {
        return interaction.reply({ content: `Impossible de mute ${interaction.options.getUser('user')}`, ephemeral: true });
    });
}

const command = {
    name: "mute",
    description: "Mute the given user",
    options:[
        {
            name: "user",
            description: "L'utilisateur à mute",
            type:6,
            required: true,
        },
        {
            name: "raison",
            description: "La raison du mute",
            type:3,
        },
    ],
    default_member_permissions: 268435456,
    run: (interaction, client) => Mute(interaction, client)
}

export default command;