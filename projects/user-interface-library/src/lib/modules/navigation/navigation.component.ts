import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { NavigationLink } from '../../core/models/navigation-link';
import { NavigationLinkType } from '../../core/enums/navigation-link-type.enum';

@Component({
  selector: 'uilibrary-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit {
  @Input() showUserDetails: boolean = true;
  @ViewChild('navLinks') navLinks!: ElementRef;

  visibleLinks: NavigationLink[] = [
    { label:'Home', path:'/home', type: NavigationLinkType.Route },
    { label:'Tools', path:'/tools', type: NavigationLinkType.Route, children: [
      { label:'The Tool', path:'/thetool', type: NavigationLinkType.Route },
      { label:'The Tool', path:'/thetool', type: NavigationLinkType.Route },
      { label:'The Tool', path:'/thetool', type: NavigationLinkType.Route },
      { label:'The Tool', path:'/thetool', type: NavigationLinkType.Route },
      { label:'The Tool', path:'/thetool', type: NavigationLinkType.Route },
    ]},
    { label:'Contact Us', path:'/contact', type: NavigationLinkType.Route },
    { label:'Home', path:'/home', type: NavigationLinkType.Route },
    { label:'Tools', path:'/tools', type: NavigationLinkType.Route, children: [
      { label:'The Tool', path:'/thetool', type: NavigationLinkType.Route }
    ]},
    { label:'Contact Us', path:'/contact', type: NavigationLinkType.Route },
    { label:'Home', path:'/home', type: NavigationLinkType.Route },
    { label:'Tools', path:'/tools', type: NavigationLinkType.Route, children: [
      { label:'The Tool', path:'/thetool', type: NavigationLinkType.Route }
    ]},
    { label:'Contact Us', path:'/contact', type: NavigationLinkType.Route },
  ];

  overflowLinks: NavigationLink[] = [];

  dropdownVisible = false;

  constructor() { }

  @HostListener('window:resize')
    onResize() {
        this.adjustNav();
    }

  ngAfterViewInit() {
      this.adjustNav();
  }

  public toggleDropdown($event: MouseEvent) {
    $event.preventDefault();
    this.dropdownVisible = !this.dropdownVisible;
  }

  private adjustNav() {
    const navLinks = this.navLinks.nativeElement;
    const navLinkWidth: number = 160; 
    const userDetailsWidth: number =  this.showUserDetails ? 300 : 0
    const navbarWidth: number = navLinks.parentElement.offsetWidth;
    const logoWidth: number = navLinks.previousElementSibling.offsetWidth;

    const allLinks = [...this.visibleLinks, ...this.overflowLinks]

    let totalSpaceRemaining: number = navbarWidth - (logoWidth + navLinkWidth * 2 + userDetailsWidth); //Add 1 navlink for overflow dropdown

    this.visibleLinks = [];
    this.overflowLinks = [];
    allLinks.forEach(navLink => {
      if(totalSpaceRemaining >= navLinkWidth) {
        this.visibleLinks.push(navLink);
        totalSpaceRemaining = totalSpaceRemaining - navLinkWidth;
      } else {
        this.overflowLinks.push(navLink);
      }
    });
  }

  public trackByFn(index: number, item: any) {
    return index;
  }
}
