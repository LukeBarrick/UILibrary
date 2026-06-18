import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationDropdownComponent } from './navigation-dropdown/navigation-dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationOptionComponent } from './navigation-option/navigation-option.component';
import { RouterModule } from '@angular/router';
import { IconModule } from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    IconModule
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
