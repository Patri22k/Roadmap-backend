export default function formatDate(date: string): string {
    if (!date) return "Unknown Date";

    // Set the locale to 'en-GB' for British English
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        year: "numeric",
        month: "long"
    };
    let formattedDate = new Date(date).toLocaleDateString('en-GB', options);

    // Add a comma before the year
    formattedDate = formattedDate.replace(/ (?!.* )/, ', ');

    return formattedDate;
}