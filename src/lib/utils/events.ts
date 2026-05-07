import type { EventResponseDto } from "@/lib/services/generated/frontend/schemas";

/**
 * Format a date string to "DD Month" format
 * e.g., "2024-05-12T10:30:00Z" -> "12 May"
 */
export function formatEventDate(dateString?: string | null): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${day} ${month}`;
}

/**
 * Format a date string to "HH:MM AM/PM" format
 * e.g., "2024-05-12T14:30:00Z" -> "2:30 PM"
 */
export function formatEventTime(dateString?: string | null): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Check if an event is in the future
 */
export function isEventUpcoming(startTime?: string | null): boolean {
  if (!startTime) return false;
  return new Date(startTime) > new Date();
}

/**
 * Separate events into upcoming (top 3) and past events
 */
export function separateEvents(events: EventResponseDto[]) {
  // Defensive check - ensure events is always an array
  const eventsList = Array.isArray(events) ? events : [];
  const now = new Date();

  const upcomingEvents = eventsList
    .filter((event) => event.startTime && new Date(event.startTime) > now)
    .sort((a, b) => {
      const aTime = a.startTime ? new Date(a.startTime).getTime() : 0;
      const bTime = b.startTime ? new Date(b.startTime).getTime() : 0;
      return aTime - bTime;
    })
    .slice(0, 3); // Top 3 upcoming events

  const pastEvents = eventsList
    .filter((event) => event.startTime && new Date(event.startTime) <= now)
    .sort((a, b) => {
      const aTime = a.startTime ? new Date(a.startTime).getTime() : 0;
      const bTime = b.startTime ? new Date(b.startTime).getTime() : 0;
      return bTime - aTime; // Most recent first
    });

  return { upcomingEvents, pastEvents };
}
