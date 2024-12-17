export default function DataTypePrint(event: any, eventType: string) {
    if (eventType == 'PullRequestEvent') {
        console.log(`Pushed commit to ${event.repo.name}`);
    } else if (eventType == 'PushEvent') {
        console.log(`Pulled from ${event.repo.name} repository`);
    } else if (eventType == 'DeleteEvent') {
        console.log(`Branch ${event.repo.name} was deleted`);
    } else if (eventType == 'IssuesEvent') {
        console.log(`Issue was created in ${event.repo.name}`);
    } else {
        // TODO: Handle error
        console.log(`Unsupported event`);
    }
}