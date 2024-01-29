import loadClient from "./utils/loadClient.js";
import { config } from "dotenv";

config();
const client = loadClient();

if (client === null) {
    console.error("An error has occured, closing the program...");
    exit(1);
} else {
    if (!client.config.TOKEN) {
        console.error("No token entered in the .env file, closing the program...");
        exit(1);
    }
    client.login(client.config.TOKEN);
}