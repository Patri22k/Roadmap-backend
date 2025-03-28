export default function DataTypePrint(event: any, eventType: string, result: string[]) {
    switch (eventType) {
        case "PushEvent":
            result.push(`PushEvent ${event.repo.name}`);
            break;
        case "PullEvent":
            result.push(`PullEvent ${event.repo.name}`);
            break;
        default:
            result.push(`Unknown ${eventType}`);
            break;
    }
}
