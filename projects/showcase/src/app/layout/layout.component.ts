import { Component, OnInit } from '@angular/core';
import { NavigationLink, NavigationLinkType } from 'uilibrary';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    standalone: false
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


   links: NavigationLink[] = [
      { label:'Home', path:'/home', type: NavigationLinkType.Route },
      { label:'Documentation', path:'/docs', type: NavigationLinkType.Route },
      { label:'Guides', path:'/guides', type: NavigationLinkType.Route },
      { label:'Blog', path:'/blog', type: NavigationLinkType.Route },
      { label:'Old Docs', path:'/showcase', type: NavigationLinkType.Route },
    ];

}
