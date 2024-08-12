import { NgModule } from '@angular/core';
import { UserInterfaceLibraryComponent } from './user-interface-library.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { NavigationModule } from './modules/navigation/navigation.module';
import { RadioButtonsModule } from './modules/radio-buttons/radio-buttons.module'
import { SelectModule } from './modules/select/select.module';
import { TextInputsModule } from './modules/text-inputs/text-inputs.module';
import { CheckboxesModule } from './modules/checkboxes/checkboxes.module';
import { InputAnnotationsModule } from './modules/input-annotations/input-annotations.module';
import { FormControlModule } from './modules/form-control/form-control.module';
import { TogglesModule } from './modules/toggles/toggles.module';

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
    RadioButtonsModule,
    TogglesModule,
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