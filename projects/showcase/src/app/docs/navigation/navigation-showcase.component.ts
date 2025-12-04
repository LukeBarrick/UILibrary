import { Component, OnInit } from '@angular/core';
import { NavigationLink, NavigationLinkType } from 'uilibrary';

@Component({
  selector: 'app-navigation-showcase',
  templateUrl: './navigation-showcase.component.html',
  styleUrls: ['./navigation-showcase.component.css']
})
export class NavigationShowcaseComponent implements OnInit {

  links: NavigationLink[] = [
    { label: 'Home', path: '/', type: NavigationLinkType.Route },
    { label: 'About', path: '/about', type: NavigationLinkType.Route },
    { label: 'Contact', path: '/contact', type: NavigationLinkType.Route }
  ];

  linksWithDropdowns: NavigationLink[] = [
    { label: 'Home', path: '/', type: NavigationLinkType.Route },
    { label: 'Products', path: '', type: NavigationLinkType.Route, children: [
      { label: 'Web Development', path: '/products/web', type: NavigationLinkType.Route },
      { label: 'Mobile Apps', path: '/products/mobile', type: NavigationLinkType.Route },
      { label: 'Consulting', path: '/products/consulting', type: NavigationLinkType.Route }
    ]},
    { label: 'Services', path: '', type: NavigationLinkType.Route, children: [
      { label: 'Design', path: '/services/design', type: NavigationLinkType.Route },
      { label: 'Development', path: '/services/development', type: NavigationLinkType.Route },
      { label: 'Support', path: '/services/support', type: NavigationLinkType.Route }
    ]},
    { label: 'About', path: '/about', type: NavigationLinkType.Route },
    { label: 'Contact', path: '/contact', type: NavigationLinkType.Route }
  ];

  mixedLinks: NavigationLink[] = [
    { label: 'Route', path: '/', type: NavigationLinkType.Route },
    { label: 'External URL', path: 'https://www.google.com', type: NavigationLinkType.URL },
    { label: 'New Tab URL', path: 'https://www.github.com', type: NavigationLinkType.TargetBlankURL },
    { label: 'Dropdown', path: '', type: NavigationLinkType.Route, children: [
      { label: 'Internal Route', path: '/internal', type: NavigationLinkType.Route },
      { label: 'External Link', path: 'https://www.example.com', type: NavigationLinkType.URL },
      { label: 'New Tab Link', path: 'https://www.stackoverflow.com', type: NavigationLinkType.TargetBlankURL }
    ]}
  ];

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }
}