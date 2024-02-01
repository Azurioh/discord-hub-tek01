import { PermissionsBitField } from 'discord.js';

function Tempban(interaction, client)
{
    const tempban = interaction.options.getUser('user').id;
    
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return interaction.reply({ content: "Tu dois avoir les permissions de bannir temporariement quelqu'un afin d'utiliser cette commande", ephemeral: true });
    }
    if (interaction.member.id === tempban) {
        return interaction.reply({ content: "Impossible de te ban temporarement toi même", ephemeral: true });
    }
    let reason = interaction.options.getString('raison');
    const time = interaction.options.getInteger('time');
    if (!reason) {
        reason = "No reason given";
    }
    if (!time || isNaN(time)) {
        return interaction.reply({ content: "Veuillez fournir une durée valide en heure.", ephemeral: true });
    }

    const duration = time * 1000 * 60 * 60;

    interaction.guild.members.ban(tempban, { reason: reason }).then(() => {
        setTimeout(() => {
            interaction.guild.members.unban(tempban, "Ban temporaire levé");
        }, duration);
        return interaction.reply({ content: `${interaction.options.getUser('user')} a été banni temporairement pour ${time} heures`, ephemeral: true });
    }).catch(() => {
        return interaction.reply({ content: `Impossible de bannir ${interaction.options.getUser('user')}`, ephemeral: true });
    });
}

const command = {
    name: "tempban", 
    description: "ban a user for x amount of time",
    options:[
        {
            name: "user",
            description: "L'utilisateur à tempban",
            type:6,
            required: true,
        },
        {
            name: "raison",
            description: "La raison du tempban",
            type:3,
            required: true,
        },
        {
            name: "time",
            description: "La durée du tempban",
            type:4,
            required: true,
        },
    ],
    default_member_permissions: 8,
    run: (interaction, client) => Tempban(interaction, client)
}

export default command;