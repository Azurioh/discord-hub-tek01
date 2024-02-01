import { Events } from "discord.js";
import deployCommands from "../utils/deployCommands.js";
import { QuickDB } from "quick.db";

function Ready(client)
{
    deployCommands(client);
    console.log(`Bot connected on the account: ${client.user.tag}`);
    setInterval(() => {
        const db = new QuickDB();
        const currentTime = Date.now();

        db.all().then(array => {
            array.forEach((user) => {
                if (user.id.includes("timer")){
                    const userId = user.id.replace('timer_', '');
                    db.get(`timer_${userId}`).then(result => {
                        const endTime = result;
                        if (currentTime > endTime) {
                            const userObject = client.users.cache.get(userId);
                            db.get(`message_${userId}`).then(result => {
                                userObject.send(`You asked me to remind you of : ${result}`);
                                db.delete(`timer_${userId}`);
                                db.delete(`message_${userId}`);
                            })
                        }})
                    }})
        });
    }, 1000);
}

const event = {
    name: Events.ClientReady,
    run: (client) => Ready(client),
}

export default event;