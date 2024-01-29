import loadClient from "./utils/loadClient.js";
import { config } from "dotenv";

async function Main()
{
    config();
    const client = loadClient();

    if (client === null) {
        console.error("An error has occured, closing the program...");
        return;
    } else {
        if (!client.config.TOKEN) {
            console.error("No token entered in the .env file, closing the program...");
            return;
        }
        await client.login(client.config.TOKEN);
    }
}

(async () => Main())();