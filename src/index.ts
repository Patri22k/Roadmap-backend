#!/usr/bin/env node

import { Command } from 'commander';
import DataTypePrint from "./utils/dataTypePrint";

const program = new Command();

// Define url here to scope it on the whole file
let url;

// Define the CLI command
program
    .command('github-activity <username>')
    .description('Print GitHub activity for the specified username')
    .action(async (username) => {
        console.log(`Fetching GitHub activity for user: ${username}`);

        url = `https://api.github.com/users/${username}/events`;

        let i = 0;
        try {
            let fetchData = await fetch(url)
                .then(response => response.json());
            fetchData = fetchData.slice(-10);

            for (const item of fetchData) {
                if (i > 10) {
                    break;
                }
                if (item.actor.login === username) {
                    // TODO: Add logic based on the item.type
                    DataTypePrint(item, item.type);
                    i++;
                }
            }
        } catch (e) {
            console.log(`Error fetching data: ${e}`);
        }
    });

// Parse the arguments
program.parse(process.argv);
