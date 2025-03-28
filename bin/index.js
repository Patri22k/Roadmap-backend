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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const dataTypePrint_1 = __importDefault(require("./utils/dataTypePrint"));
const program = new commander_1.Command();
// Define url here to scope it on the whole file
let url;
// Define the CLI command
program
    .name('github-activity')
    .description('Print GitHub activity for the specified username')
    .argument('<username>', 'GitHub username to fetch activity for')
    .action((username) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Fetching GitHub activity for user: ${username}`);
    url = `https://api.github.com/users/${username}/events`;
    try {
        let fetchData = yield fetch(url)
            .then(response => response.json());
        fetchData = fetchData.slice(-10);
        let i = 0;
        for (const item of fetchData) {
            if (i > 10) {
                break;
            }
            if (item.actor.login === username) {
                // TODO: Add logic based on the item.type
                (0, dataTypePrint_1.default)(item, item.type);
                i++;
            }
        }
    }
    catch (e) {
        console.log(`Error fetching data for user ${username}: ${e}`);
    }
}));
// Parse the arguments
program.parse(process.argv);
