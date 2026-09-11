export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startTime: string; // e.g. "20261212T020000Z" (UTC)
  endTime: string;   // e.g. "20261212T060000Z" (UTC)
}

/**
 * Generate direct Google Calendar link
 */
export function getGoogleCalendarUrl(event: CalendarEventDetails): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${event.startTime}/${event.endTime}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
