import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationDropdownComponent } from './navigation-dropdown/navigation-dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationOptionComponent } from './navigation-option/navigation-option.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    NavigationComponent,
    NavigationDropdownComponent,
    NavigationOptionComponent
  ],
  exports: [
    NavigationComponent,
    NavigationDropdownComponent,
    NavigationOptionComponent
  ]
})
export class NavigationModule { }
