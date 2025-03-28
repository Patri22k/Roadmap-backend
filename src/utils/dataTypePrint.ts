export default function DataTypePrint(event: any, eventType: string, result: string[]) {
    switch (eventType) {
        case "PushEvent":
            result.push(`PushEvent ${event.repo.name}`);
            break;
        case "PullEvent":
            result.push(`PullEvent ${event.repo.name}`);
            break;
        case "CreateEvent":
            result.push(`CreateEvent ${event.repo.name}`);
            break;
        case "ForkEvent":
            result.push(`ForkEvent ${event.repo.name}`);
            break;
        case "DeleteEvent":
            result.push(`DeleteEvent ${event.repo.name}`);
            break;
        case "WatchEvent":
            result.push(`WatchEvent ${event.repo.name}`);
            break;
        case "CommentEvent":
            result.push(`CommentEvent ${event.repo.name}`);
            break;
        case "IssueEvent":
            result.push(`IssueEvent ${event.repo.name}`);
            break;
        case "StarEvent":
            result.push(`StarEvent ${event.repo.name}`);
            break;
        default:
            result.push(`Unknown ${eventType}`);
            break;
    }
}
