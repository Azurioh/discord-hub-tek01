import { Events } from "discord.js";
import deployCommands from "../utils/deployCommands.js";

function Ready(client)
{
    deployCommands(client);
    console.log(`Bot connected on the account: ${client.user.tag}`);
}

const event = {
    name: Events.ClientReady,
    run: (client) => Ready(client),
}

export default event;