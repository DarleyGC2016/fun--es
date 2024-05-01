import { CalendarAvailability, CalendarEvent, CalendarSlot, Weekday } from '../types';

/**
 * Verifica - se o médico tem data disponivel na agenda e se tem conflito com os
 * eventos dele.
 *
 * @param availability
 * @param slot
 * @param events
 * @returns boolean
 */

export const isSlotAvailableWithEvents = (
  availability: CalendarAvailability,
  events: Array<Omit<CalendarEvent, 'buffer'>>,
  slot: CalendarSlot,
): boolean => {
  return availability.include.every(av => {
    return (
      (av.weekday === slot.start.getDay() && av.range[0].hours === slot.start.getHours()) ||
      (av.range[1].hours === slot.start.getHours() && slot.start.getTime() === events[0].start.getTime()) ||
      slot.start.getTime() === events[0].end.getTime()
    );
  });
};
