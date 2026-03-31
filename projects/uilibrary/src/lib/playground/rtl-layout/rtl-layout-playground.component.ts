import { Component } from '@angular/core';
import { LayoutDirection } from '../../modules/rtl-layout/rtl-layout.directive';

interface DemoItem {
    label: string;
    color: string;
}

@Component({
    selector: 'uilibrary-rtl-layout-playground',
    templateUrl: 'rtl-layout-playground.component.html',
    styleUrl: 'rtl-layout-playground.component.scss',
    standalone: false,
})
export class RtlLayoutPlaygroundComponent {

    direction: LayoutDirection = 'ltr';

    get isRtl(): boolean {
        return this.direction === 'rtl';
    }

    toggleDirection(): void {
        this.direction = this.isRtl ? 'ltr' : 'rtl';
    }

    setDirection(dir: LayoutDirection): void {
        this.direction = dir;
    }

    // Coloured boxes used in the FlexBox demo
    flexItems: DemoItem[] = [
        { label: 'Item 1', color: '#408467' },
        { label: 'Item 2', color: '#007EAB' },
        { label: 'Item 3', color: '#E8C557' },
        { label: 'Item 4', color: '#D63D52' },
    ];

    // Spacing scale labels for the margin/padding demo
    spacerKeys: number[] = [0, 1, 2, 3, 4, 5];
}
