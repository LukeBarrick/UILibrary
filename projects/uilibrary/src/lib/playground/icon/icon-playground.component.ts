import { Component } from '@angular/core';
import { IconConstants } from '../../core/constants/icon.constants';

@Component({
    selector: 'uilibrary-icon-playground',
    templateUrl: 'icon-playground.component.html',
    styleUrl: "icon-playground.component.scss",
    standalone: false
})

export class IconPlaygroundComponent {

  availableIcons = Object.values(IconConstants);
}
