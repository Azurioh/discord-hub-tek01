import { Client, Collection, Partials, IntentsBitField } from "discord.js";
import { glob } from "glob";

async function loadCommands(client) {
    const commands = await glob(`${process.cwd()}/src/commands/*/*.js`);

    client.commands = new Collection();
    client.arrayOfCommands = [];
    if (!commands) {
        return null;
    }
    await Promise.all(commands.map(async (command) => {
        let file = await import(command);
        file = file?.default;

        if (!file?.name) {
            return false;
        }
        client.commands.set(file.name, file);
        client.arrayOfCommands.push(file);
    }));
    return true;
}

async function loadEvents(client) {
    const events = await glob(`${process.cwd()}/src/events/*.js`);

    client.events = new Collection();
    if (!events) {
        return null;
    }
    await Promise.all(events.map(async (event) => {
        let file = await import(event);
        file = file?.default;

        if (!file?.name) {
            return false;
        }
        try {
            client.on(file.name, (...args) => file.run(...args, client));
        } catch (err) {
            console.error(err);
            return false;
        }
    }));
    return true;
}

async function loadButtons(client) {
    const buttons = await glob(`${process.cwd()}/src/buttons/*.js`);

    client.buttons = new Collection();
    if (!buttons) {
        return null;
    }
    await Promise.all(buttons.map(async (button) => {
        let file = await import(button);
        file = file?.default;

        if (!file?.name) {
            return false;
        }
        client.buttons.set(file.name, file);
    }));
    return true;
}

async function loadElements(client) {
    const commands = await loadCommands(client);
    const events = loadEvents(client);
    const buttons = loadButtons(client);

    if (commands === false || events === false || buttons === false) {
        return false;
    }
    return true;
}

function loadClient() {
    const client = new Client({
        intents: [new IntentsBitField(3276799)],
        partials: [Partials.Channel, Partials.GuildMember, Partials.User, Partials.Message],
    });

    if (loadElements(client) === false) {
        return null;
    }
    client.config = process.env;
    return client;
}

export default loadClient;