import { CalendarAvailability, CalendarEvent, CalendarSlot, Weekday } from '../types';

/**
 * Verifica - se o médico tem data disponivel na agenda e se tem conflito com os
 * eventos e se tem buffer em qual momento.
 *
 * @param availability
 * @param slot
 * @param events
 * @returns boolean
 */

export const isSlotAvailableWithBuffer = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  slot: CalendarSlot,
): boolean => {
  return availability.include.every(av => {
    return (
      (av.weekday === slot.start.getDay() &&
        (av.range[0].hours === slot.start.getHours() || av.range[1].hours === slot.start.getHours()) &&
        slot.start.getTime() === events[0].start.getTime()) ||
      (slot.start.getTime() === events[0].end.getTime() && slot.durationM === events[0].buffer?.after) ||
      !(slot.durationM === events[0].buffer?.before)
    );
  });
};
