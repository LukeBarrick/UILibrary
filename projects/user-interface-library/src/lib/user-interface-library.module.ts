import { NgModule } from '@angular/core';
import { UserInterfaceLibraryComponent } from './user-interface-library.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputsModule } from './modules/text-inputs/text-inputs.module';
import { CheckboxesModule } from './modules/checkboxes/checkboxes.module';
import { InputAnnotationsModule } from './modules/input-annotations/input-annotations.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { SelectModule } from '../public-api';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormControlModule } from './modules/form-control/form-control.module';

@NgModule({
  declarations: [
    UserInterfaceLibraryComponent,
    ShowcaseComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule,
    TextInputsModule,
    CheckboxesModule,
    InputAnnotationsModule,
    NavigationModule,
    SelectModule,
    FormControlModule
  ],
  exports: [
    UserInterfaceLibraryComponent,
    ShowcaseComponent
  ]
})
export class UserInterfaceLibraryModule { }