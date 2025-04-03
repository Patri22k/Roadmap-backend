export default function convertDate(date: string): string {
    if (!date) {
        return "";
    }

    const dateParts = date.trim().split(".");

    if (dateParts.length !== 3) {
        return "Invalid date format. Expected DD.MM.YYYY";
    }

    const [day, month, year] = dateParts;

    if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
        return "Invalid date parts. Use format: DD.MM.YYYY";
    }

    if (Number(day) < 1 || Number(day) > 31 || Number(month) < 1 || Number(month) > 12) {
        return "Invalid date parts. Use format: DD.MM.YYYY";
    }

    return `${year}-${month}-${day}`;
}