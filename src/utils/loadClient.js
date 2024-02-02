import { Client, Collection, Partials, IntentsBitField, EmbedBuilder } from "discord.js";
import { glob } from "glob";
import { DisTube } from "distube";

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

function loadDistube(client)
{
    client.distube = new DisTube(client, {
        emitNewSongOnly: true,
        leaveOnFinish: true,
        emitAddSongWhenCreatingQueue: false,
    });
}

function DistubeEvents(client)
{
    const embed = new EmbedBuilder();

    client.distube.on("playSong", (queue, song) => {
        embed.setColor(0x00FF00);
        embed.setDescription(`Nouveau son: ${song.name} - \`${song.formattedDuration}\`\nAjouté à la queue par: ${song.user}`);
        queue.textChannel.send({ embeds: [embed] });
        return;
    });
    client.distube.on("addSong", (queue, song) => {
        embed.setColor(0x00FF00);
        embed.setDescription(`Ajout du son: ${song.name} - \`${song.formattedDuration}\` à la file d'attente\nAjouté à la queue par: ${song.user}`);
        queue.textChannel.send({ embeds: [embed] });
        return;
    });
    client.distube.on("addList", (queue, playlist) => {
        embed.setColor(0x00FF00);
        embed.setDescription(`Ajout de la playlist: \`${playlist.name}\`\n ${playlist.songs.length} ont été ajoutés`);
        queue.textChannel.send({ embeds: [embed] });
        return;
    });
    client.distube.on("error", (channel, e) => {
        embed.setColor(0xFF0000);
        embed.setDescription(`Une erreur est survenue: ${e}`);
        channel.send({ embeds: [embed] });
        return;
    });
    client.distube.on("empty", channel => {
        const queue = client.distube.getQueue(channel.guild);
        embed.setColor(0xFF0000);
        embed.setDescription("Le vocal est actuellement vide, je quitte le channel");
        channel.send({ embeds: [embed] });
        return;
    });
    client.distube.on("searchNoResult", message => {
        embed.setColor(0xFF0000);
        embed.setDescription("Aucun résultat trouvé");
        message.channel.send({ embeds: [embed] });
        return;
    });
    client.distube.on("finish", queue => {
        setTimeout(async () => {
            if (!queue.textChannel.guild.me.voice.channelId) {
                clearTimeout();
                return;
            }
            if (queue != undefined && queue.playing) {
                clearTimeout();
                return;
            }
            embed.setColor(0xFF0000);
            embed.setDescription("Plus aucune musique dans la file d'attente, je quitte le channel");
            queue.textChannel.send({ embeds: [embed] });
            return;
        }, 1000 * 10);
    });
}

function loadClient() {
    const client = new Client({
        intents: [new IntentsBitField(3276799)],
        partials: [Partials.Channel, Partials.GuildMember, Partials.User, Partials.Message],
    });

    if (loadElements(client) === false) {
        return null;
    }
    loadDistube(client);
    DistubeEvents(client);
    client.config = process.env;
    return client;
}

export default loadClient;