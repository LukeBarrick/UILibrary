import { Component, OnInit } from '@angular/core';
import { NavigationLink } from '../../core/models/navigation-link';
import { NavigationLinkType } from '../../core/enums/navigation-link-type.enum';

@Component({
    selector: 'uilibrary-navigation-playground',
    templateUrl: 'navigation-playground.component.html',
    styleUrl: 'navigation-playground.component.scss',
    standalone: false
})

export class NavigationPlaygroundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    links: NavigationLink[] = [
        { label: 'Route', path: '/', type: NavigationLinkType.Route },
        { label: 'URL', path: 'http://www.google.com/', type: NavigationLinkType.URL },
        { label: 'Blank', path: 'http://www.google.com//', type: NavigationLinkType.TargetBlankURL },
        {
            label: 'DropDown', path: '', type: NavigationLinkType.Route, children: [
                { label: 'Route', path: '/', type: NavigationLinkType.Route },
                { label: 'URL', path: 'http://www.google.com///', type: NavigationLinkType.URL },
                { label: 'Blank', path: 'http://www.google.com////', type: NavigationLinkType.TargetBlankURL }
            ]
        }
    ];
}