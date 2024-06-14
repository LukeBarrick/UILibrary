import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationDropdownComponent } from './navigation-dropdown/navigation-dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    NavigationComponent,
    NavigationDropdownComponent
  ],
  exports: [
    NavigationComponent,
    NavigationDropdownComponent
  ]
})
export class NavigationModule { }
