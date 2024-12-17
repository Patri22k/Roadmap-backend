#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
// Define url here to scope it on the whole file
let url;
// Define the CLI command
program
    .command('github-activity username')
    .description('Print GitHub activity for the specified username')
    .action((username) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Fetching GitHub activity for user: ${username}`);
    // TODO: Add logic
    url = `https://api.github.com/users/${username}/events`;
    let fetchData;
    try {
        fetchData = yield fetch(url)
            .then(response => response.json());
        console.log(fetchData);
    }
    catch (e) {
        console.log(`Error fetching data: ${e}`);
    }
}));
// Parse the arguments
program.parse(process.argv);
