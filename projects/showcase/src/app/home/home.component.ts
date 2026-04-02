import { Component, OnInit } from '@angular/core';
import { NavigationLink, NavigationLinkType } from 'uilibrary';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  darkMode: boolean = false;
  emailAlerts: boolean = true;
  filter_analytics: boolean = true;
  filter_reports: boolean = false;
  filter_exports: boolean = true;
  reportFrequency: string = 'weekly';
  searchTerm: string = '';
  selectedCategory: string = '';

  demoLinks: NavigationLink[] = [
    { label: 'Dashboard', path: '#', type: NavigationLinkType.URL },
    { label: 'Reports',   path: '#', type: NavigationLinkType.URL },
    { label: 'Settings',  path: '#', type: NavigationLinkType.URL },
  ];

  categories: string[] = ['Design', 'Engineering', 'Marketing', 'Analytics'];

  tableRows: { id: number; name: string; status: string }[] = [
    { id: 1, name: 'Component audit',    status: 'success' },
    { id: 2, name: 'Token migration',    status: 'warning' },
    { id: 3, name: 'Accessibility pass', status: 'error'   },
  ];

  constructor() { }

  ngOnInit() { }

}
