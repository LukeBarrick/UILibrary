import { DateRange } from "./date-range";

export abstract class DateSelectionStrategy {
  /**
   * Called when the start date changes.
   */
  abstract calculateSelection(start: Date | null, current: DateRange): DateRange;
}