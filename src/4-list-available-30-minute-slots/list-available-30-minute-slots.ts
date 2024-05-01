import { CalendarAvailability, CalendarEvent, CalendarSlot, Weekday } from '../types';

/**
 * Lista agenda do médico com seus compromissos em duas datas distintas
 *
 * @param availability
 * @param events
 * @param range
 * @returns slots
 */

export const listAvailable30MinuteSlots = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  range: [Date, Date],
): Array<CalendarSlot> => {
  const slots: CalendarSlot[] = [];

  events.forEach(event => {
    if (event.start.getDate() === range[0].getDate() && event.end.getDate() === range[1].getDate()) {
      availability.include.forEach(element => {
        if (element.weekday === event.start.getDay() || element.weekday === event.end.getDay()) {
          slots.push(
            { start: new Date(event.start.toString()), durationM: 30 },
            { start: new Date(event.end.toString()), durationM: 30 },
          );
        }
      });
    }
  });

  return slots;
};
