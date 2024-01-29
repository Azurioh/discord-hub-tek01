import { REST, Routes } from "discord.js";

async function loadCommands(client) 
{
    const rest = new REST().setToken(client.config.TOKEN);

    try {
        console.log(`Loading ${client.arrayOfCommands.length} commands.`);
        const data = await rest.put(
            Routes.applicationCommands(client.user.id), {
                body: client.arrayOfCommands
            },
        );
        console.log(`Successfully loaded ${data.length} commands.`);
    } catch (err) {
        console.error(err);
    }
}

export default loadCommands