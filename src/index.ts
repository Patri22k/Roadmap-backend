#!/usr/bin/env node

import { Command } from 'commander';
import DataTypePrint from "./utils/dataTypePrint";

const program = new Command();

// Define url here to scope it on the whole file
let url;

// Define the CLI command
program
    .name('github-activity')
    .description('Print GitHub activity for the specified username')
    .argument('<username>', 'GitHub username to fetch activity for')
    .action(async (username) => {
        console.log(`Fetching GitHub activity for user: ${username}`);

        url = `https://api.github.com/users/${username}/events`;

        try {
            let fetchData = await fetch(url)
                .then(response => response.json());
            fetchData = fetchData.slice(-10);

            let i = 0;
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
            console.log(`Error fetching data for user ${username}: ${e}`);
        }
    });

// Parse the arguments
program.parse(process.argv);
