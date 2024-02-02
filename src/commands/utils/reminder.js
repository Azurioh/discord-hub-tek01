import { PermissionsBitField } from 'discord.js';
import { QuickDB } from 'quick.db';

async function Remind(interaction, client) {
    const userId = interaction.user.id;
    const user = await client.users.fetch(userId);

    const messageContent = interaction.options.getString('message');
    const day = interaction.options.getInteger('day') || 0;
    const hours = interaction.options.getInteger('hours') || 0;
    const minutes = interaction.options.getInteger('minutes') || 0;

    const durationInSeconds = (day * 60 * 60 * 24) + (hours * 60 * 60) + (minutes * 60);

    let db = new QuickDB();
    let reminders = db.get(`reminders_${userId}`) || [];

    if (!Array.isArray(reminders)) {
        reminders = [];
    }

    const endTime = Date.now() + durationInSeconds * 1000;

    reminders.push({ endTime, message: messageContent });
    db.set(`reminders_${userId}`, reminders);

    setTimeout(() => {
        user.send(`Reminder: ${messageContent}`).catch(console.error);
    }, durationInSeconds * 1000);

    interaction.reply(`The timer has been set for ${durationInSeconds} seconds. It will expire at ${new Date(endTime).toLocaleTimeString()}.`);
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