import { Component, Input, OnInit, inject } from '@angular/core';
import { NavigationLink } from '../../../core/models/navigation-link';
import { NavigationLinkType } from '../../../core/enums/navigation-link-type.enum';
import { Router } from '@angular/router';

@Component({
    selector: 'uilibrary-navigation-dropdown',
    templateUrl: './navigation-dropdown.component.html',
    standalone: false
})
export class NavigationDropdownComponent implements OnInit {
  @Input() links: NavigationLink[] | null = [];
  @Input() label: string = '';

  constructor(private router: Router) {}

  isRoutesActive() {
    return this.links?.some(l => this.router.isActive(l.path, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored'}));
  }

  NavigationLinkType = NavigationLinkType;

  ngOnInit() {
  }

}
