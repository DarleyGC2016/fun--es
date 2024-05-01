import { CalendarAvailability, CalendarSlot } from '../types';

/**
 * Verifica - se o médico tem data disponivel na agenda.
 *
 * @param availability
 * @param slot
 * @returns boolean
 */

export const isSlotAvailable = (availability: CalendarAvailability, slot: CalendarSlot): boolean => {
  return availability.include.every(element => {
    return (
      element.weekday != slot.start.getDay() &&
      element.range[0].hours != slot.start.getHours() &&
      element.range[0].minutes != slot.start.getMinutes() &&
      element.range[1].hours != slot.start.getHours() &&
      element.range[1].minutes != slot.start.getMinutes()
    );
  });
};
