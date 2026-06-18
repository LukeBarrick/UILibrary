import { Component, Input } from '@angular/core';
import { NavigationLinkType } from '../../../core/enums/navigation-link-type.enum';
import { Router } from '@angular/router';
import { NavigationDropdownLink } from '../../../core/models/dropdown-navigation-link';

@Component({
    selector: 'uilibrary-navigation-dropdown',
    templateUrl: './navigation-dropdown.component.html',
    standalone: false
})
export class NavigationDropdownComponent {
  @Input() links: NavigationDropdownLink[] | null = [];
  @Input() label: string = '';
  @Input() icon: string | undefined = undefined;

  constructor(private router: Router) {}

  isRoutesActive() {
    return this.links?.some(l => this.router.isActive(l.path, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored'}));
  }

  NavigationLinkType = NavigationLinkType;

  onClick(item: NavigationDropdownLink, event: MouseEvent) {
    if (item.onClick) {
      item.onClick(event);
    }
  }
}
