import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ButtonAppearance, ButtonBase } from '../button.base';

@Component({
    selector: 'uilibrary-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
    standalone: false
})
export class ButtonComponent extends ButtonBase implements OnInit, OnChanges {
  @Input() size: string | undefined;
  @Input() appearance: ButtonAppearance | undefined;
  @Input() disabled: boolean | undefined;
  @Input() aria_label: string | undefined;
  @Input() icon: string | undefined;
  @Input() type: string = "button";

  sizeClass: string | undefined;
  iconSizeClass: string | undefined;
  appearanceClass: string | undefined;

  ngOnInit() {
    this.buildSizeClass();
    this.appearanceClass = this.buildAppearanceClass(this.appearance || 'primary');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildSizeClass();
    this.appearanceClass = this.buildAppearanceClass(this.appearance || 'primary');
  }
}
