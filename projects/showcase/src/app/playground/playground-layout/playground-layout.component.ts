import { Component } from '@angular/core';
import { NavigationLink, NavigationLinkType } from 'uilibrary';

@Component({
  selector: 'app-playground-layout',
  templateUrl: './playground-layout.component.html',
  styleUrls: ['./playground-layout.component.css'],
  standalone: false,
})
export class PlaygroundLayoutComponent {
  sideNavLinks: NavigationLink[] = [
    { label: 'Button',              path: '/playground/button',              type: NavigationLinkType.Route },
    { label: 'Checkbox',            path: '/playground/checkbox',            type: NavigationLinkType.Route },
    { label: 'Context Menu',        path: '/playground/context-menu',        type: NavigationLinkType.Route },
    { label: 'Date Picker',         path: '/playground/datepicker',          type: NavigationLinkType.Route },
    { label: 'Form Field',          path: '/playground/form-field',          type: NavigationLinkType.Route },
    { label: 'Icon',                path: '/playground/icon',                type: NavigationLinkType.Route },
    { label: 'Input',               path: '/playground/input',               type: NavigationLinkType.Route },
    { label: 'Input Annotations',   path: '/playground/input-annotations',   type: NavigationLinkType.Route },
    { label: 'Keyboard Navigation', path: '/playground/keyboard-navigation', type: NavigationLinkType.Route },
    { label: 'Navigation',          path: '/playground/navigation',          type: NavigationLinkType.Route },
    { label: 'Radio',               path: '/playground/radio',               type: NavigationLinkType.Route },
    { label: 'Select',              path: '/playground/select',              type: NavigationLinkType.Route },
    { label: 'Table',               path: '/playground/table',               type: NavigationLinkType.Route },
    { label: 'Toggle',              path: '/playground/toggle',              type: NavigationLinkType.Route },
    { label: 'Typography',          path: '/playground/typography',          type: NavigationLinkType.Route },
  ];
}
