import { Component, Input } from '@angular/core';
import { NavigationLink } from 'uilibrary';

@Component({
  selector: 'app-playground-side-nav',
  templateUrl: './playground-side-nav.component.html',
  styleUrls: ['./playground-side-nav.component.css'],
  standalone: false,
})
export class PlaygroundSideNavComponent {
  @Input() links: NavigationLink[] = [];
}
