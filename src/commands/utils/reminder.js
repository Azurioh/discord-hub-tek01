import { PermissionsBitField } from 'discord.js';
import { QuickDB } from 'quick.db';

function Remind(interaction, client)
{
    const userId = interaction.user.id;
    const message = interaction.options.getString('message');
    const day = interaction.options.getInteger('day') || 0;
    const hours = interaction.options.getInteger('hours') || 0;
    const minutes = interaction.options.getInteger('minutes') || 0;
    let db = new QuickDB();
    const duration = (day * 60 * 60 * 24) + (hours * 60 * 60) + (minutes * 60);

    const endTime = Date.now() + duration * 1000;
    db.set(`timer_${userId}`, endTime);
    db.set(`message_${userId}`, message);
    interaction.reply(`The timer has been set for ${duration} seconds. It will expire at ${new Date(endTime).toLocaleTimeString()}.`);
}

const command = {
    name: "remind",
    description: "remind the user of the message he put",
    options:[
        {
            name: "message",
            description: "Le message du MP",
            type:3,
            required: true,
        },
        {
            name: "day",
            description: "Le nombre de jours",
            type:4,
            required: false,
        },
        {
            name: "hours",
            description: "Le nombre d'heures",
            type:4,
            required: false,
        },
        {
            name: "minutes",
            description: "Le nombre de minutes",
            type:4,
            required: false,
        },
    ],
    run: (interaction, client) => Remind(interaction, client)
}

export default command; 