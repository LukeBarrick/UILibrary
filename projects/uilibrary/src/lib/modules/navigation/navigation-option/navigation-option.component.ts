import { Component, Input, OnInit } from '@angular/core';
import { NavigationLinkType } from '../../../core/enums/navigation-link-type.enum';
import { NavigationLink } from '../../../core/models/navigation-link';

@Component({
  selector: 'uilibrary-navigation-option',
  templateUrl: './navigation-option.component.html'
})
export class NavigationOptionComponent implements OnInit {

  @Input() link?: NavigationLink;

  NavigationLinkType = NavigationLinkType;
  constructor() { }

  ngOnInit() {
  }

}
