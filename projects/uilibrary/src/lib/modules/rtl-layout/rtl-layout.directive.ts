import { Directive, HostBinding, Input } from '@angular/core';

export type LayoutDirection = 'rtl' | 'ltr';

/**
 * RtlLayoutDirective
 *
 * Applies a `dir` attribute to the host element, switching between LTR and RTL
 * layout modes. Any descendants that use CSS logical properties
 * (margin-inline-start, padding-block-end, border-inline-start, etc.) or
 * FlexBox will automatically adapt to the active direction without requiring
 * direction-specific overrides.
 *
 * Usage:
 *   <div [uiRtlLayout]="'rtl'">...</div>
 *   <div [uiRtlLayout]="isRtl ? 'rtl' : 'ltr'">...</div>
 *   <div uiRtlLayout="rtl">...</div>
 */
@Directive({
    selector: '[uiRtlLayout]',
    standalone: false,
})
export class RtlLayoutDirective {

    private _direction: LayoutDirection = 'ltr';

    @Input('uiRtlLayout')
    set direction(value: LayoutDirection | '') {
        this._direction = value === 'rtl' ? 'rtl' : 'ltr';
    }

    @HostBinding('attr.dir')
    get dir(): LayoutDirection {
        return this._direction;
    }

    @HostBinding('class.ui-dir-rtl')
    get isRtl(): boolean {
        return this._direction === 'rtl';
    }

    @HostBinding('class.ui-dir-ltr')
    get isLtr(): boolean {
        return this._direction === 'ltr';
    }
}
