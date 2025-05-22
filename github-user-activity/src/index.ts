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
        console.log(`\nFetching GitHub activity for user: ${username}`);
        console.log("-".repeat(50));

        url = `https://api.github.com/users/${username}/events`;

        let result: string[] = [];

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
                    DataTypePrint(item, item.type, result);
                    i++;
                }
            }

            // Format the result (e.g. multiple commits in one repository will be joined as one)
            let eventMap = new Map<string, number>();

            // Store every type and repository per count
            result.forEach((action) => {
                const [eventType, repoName] = action.split(" ");
                const key = `${eventType} ${repoName}`
                eventMap.set(key, (eventMap.get(key) || 0) + 1);
            });             

            // Reformat the output
            const reformattedResult = Array.from(eventMap.entries()).map(([[...data], count]) => {
                const dataArray = data.join("");
                const [eventType, repoName] = dataArray.split(" ");
                
                switch (eventType) {
                    case "PushEvent":
                        return `- Pushed ${count} commit${count > 1 ? `s` : ""} to ${repoName}`
                    case "PullEvent":
                        return `- Pulled ${count} time${count > 1 ? `s` : ""} from ${repoName}`
                    case "CreateEvent":
                        return `- Created ${count} time${count > 1 ? `s` : ""} in ${repoName}`
                    case "ForkEvent":
                        return `- Forked ${count} time${count > 1 ? `s` : ""} from ${repoName}`
                    case "DeleteEvent":
                        return `- Deleted ${count} time${count > 1 ? `s` : ""} from ${repoName}`
                    case "WatchEvent":
                        return `- Watched ${count} time${count > 1 ? `s` : ""} from ${repoName}`
                    case "CommentEvent":
                        return `- Commented ${count} time${count > 1 ? `s` : ""} in ${repoName}`
                    case "IssueEvent":
                        return `- Issue ${count} time${count > 1 ? `s` : ""} in ${repoName}`
                    case "StarEvent":
                        return `- Starred ${repoName}`
                    default:
                        return `- Unknown type of event`
                }
                
            });

            // Print the result
            for (let line of reformattedResult) {
                console.log(line);
            }
            
        } catch (e) {
            console.log(`Error fetching data for user ${username}: ${e}`);
        }
        console.log();
    });

// Parse the arguments
program.parse(process.argv);
