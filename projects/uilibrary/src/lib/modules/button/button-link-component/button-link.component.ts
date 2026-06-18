import { Component, Input, OnInit } from '@angular/core';
import { ButtonAppearance, ButtonBase } from '../button.base';

@Component({
  selector: 'uilibrary-button-link',
  templateUrl: './button-link.component.html',
  styleUrl: './button-link.component.css',
  standalone: false
})
export class ButtonLinkComponent extends ButtonBase implements OnInit {
  @Input() size: string | undefined;
  @Input() appearance: ButtonAppearance | undefined;
  @Input() aria_label: string | undefined;
  @Input() icon: string | undefined;
  @Input() link: string | any[] | null = null;
  @Input() linkActiveAppearance: ButtonAppearance | undefined;
  @Input() target: string | any[] | null = null;
  @Input() href: string | any[] | null = null;

  /**
   * @deprecated Do not use routerLink on this component — use [link] instead.
   * Binding [routerLink] here applies routing to the host element, not the inner <a>.
   */
  @Input() set routerLink(_val: never) {}

  sizeClass: string | undefined;
  iconSizeClass: string | undefined;
  appearanceClass: string | undefined;
  linkActiveAppearanceClass: string = '';

  ngOnInit() {
    this.buildSizeClass();
    this.appearanceClass = this.buildAppearanceClass(this.appearance || 'primary');
    this.linkActiveAppearanceClass = this.buildAppearanceClass(this.linkActiveAppearance || 'primary');
  }
}

