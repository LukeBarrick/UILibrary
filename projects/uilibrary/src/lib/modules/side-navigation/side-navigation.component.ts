import { Component, Input } from '@angular/core';
import { NavigationLink } from '../../core/models/navigation-link';

@Component({
  selector: 'ui-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  standalone: false,
})
export class SideNavigationComponent {
  @Input() links: NavigationLink[] = [];
}
