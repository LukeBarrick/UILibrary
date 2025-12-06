import { Injectable } from '@angular/core';
import { isAfter } from 'date-fns';
import { DateSelectionStrategy } from './date-selection-strategy';
import { DateRange } from './date-range';

@Injectable()
export class DefaultDateSelectionStrategy implements DateSelectionStrategy {
  calculateSelection(start: Date | null, current: DateRange): DateRange {
    let { end } = current;

    if (start && end && isAfter(start, end)) {
      // If start > end, push end up to start
      end = start;
    }

    return { start, end };
  }
}