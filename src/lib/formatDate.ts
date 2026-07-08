// en-CA yields YYYY-MM-DD; UTC keeps date-only values from shifting a day in other timezones
const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

export function formatDate(date: string | Date): string {
    return formatter.format(new Date(date));
}
