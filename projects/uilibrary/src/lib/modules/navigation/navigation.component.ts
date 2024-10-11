import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationLink } from '../../core/models/navigation-link';
import { NavigationLinkType } from '../../core/enums/navigation-link-type.enum';

@Component({
  selector: 'uilibrary-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @Input() showRightAlignedContent: boolean = true;
  @Input() links: NavigationLink[] = [];
  @Input() showExtraMobileMenuContent: boolean = true;
  @Input() hideRightAllignedContentOnMobile: boolean = false;

  @ViewChild('navLinks') navLinks!: ElementRef;
  overflowLinks: NavigationLink[] = [];

  NavigationLinkType = NavigationLinkType;

  @HostListener('window:resize')
    onResize() {
        this.adjustNav();
    }

  ngOnInit() {
      this.adjustNav();
  }

  get allNavigationLinks() {
    return [...this.links, ...this.overflowLinks];
  }

  private adjustNav() {
    if (!this.navLinks?.nativeElement)
      return;
      
    const navLinks = this.navLinks.nativeElement;
    const navLinkWidth: number = 160; 
    const rightAlignedContentWidth: number =  this.showRightAlignedContent ? 300 : 0
    const navbarWidth: number = navLinks.parentElement.offsetWidth;
    const logoWidth: number = navLinks.previousElementSibling.offsetWidth;

    const allLinks = [...this.links, ...this.overflowLinks]

    let totalSpaceRemaining: number = navbarWidth - (logoWidth + navLinkWidth * 2 + rightAlignedContentWidth); //Add 1 navlink for overflow dropdown

    this.links = [];
    this.overflowLinks = [];
    allLinks.forEach(navLink => {
      if(totalSpaceRemaining >= navLinkWidth) {
        this.links.push(navLink);
        totalSpaceRemaining = totalSpaceRemaining - navLinkWidth;
      } else {
        this.overflowLinks.push(navLink);
      }
    });
  }

  public goToUrl(url: string, target: string){
    window.open(url, target);
  }

  public trackByFn(index: number, item: any) {
    return index;
  }
}
