#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
// Define the CLI command
program
    .command('github-activity <username>')
    .description('Print GitHub activity for the specified username')
    .action((username) => {
    console.log(`Fetching GitHub activity for user: ${username}`);
    // Add logic to fetch GitHub activity here (e.g., using an API)
});
// Parse the arguments
program.parse(process.argv);
