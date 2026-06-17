import { Component, Input } from '@angular/core';
import { NavigationLink } from 'uilibrary';

@Component({
  selector: 'ui-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  standalone: false,
})
export class SideNavigationComponent {
  @Input() links: NavigationLink[] = [];
}
