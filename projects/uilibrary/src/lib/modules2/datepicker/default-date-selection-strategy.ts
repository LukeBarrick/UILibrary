import { Injectable } from '@angular/core';
import { isAfter, isBefore, isSameDay } from 'date-fns';
import { DateSelectionStrategy } from './date-selection-strategy';
import { DateRange } from './date-range';

@Injectable()
export class DefaultDateSelectionStrategy implements DateSelectionStrategy {
    calculateSelection(value: Date | null, current: DateRange): DateRange {
        let _new: DateRange = {
            start: null,
            end: null
        }

        let isToggle: boolean = false;

        if (isSameDay(value!, current.start!)) {
            _new.start = null;
            _new.end = current.end;
            isToggle = true
        } else if (isSameDay(value!, current.end!)) {
            _new.start = current.start;
            _new.end = null;
            isToggle = true;
        }

        if (!isToggle) {
            if (!current.start) {
                _new.start = value;
            } else if (!current.end) {
                _new.end = value;
            }

            if ((current.end && value) && isAfter(value, current.end)) {
                _new.end = value;
            }

            if ((current.start && value) && isBefore(value, current.start)) {
                _new.start = value;
            }

            if ((current.start && current.end && value) && isBefore(value, current.end) && isAfter(value, current.start)) {
                _new.start = value;
            }

            if (!_new.start) {
                _new.start = current.start;
            }

            if (!_new.end) {
                _new.end = current.end;
            }
        }

        return _new;
    }
}