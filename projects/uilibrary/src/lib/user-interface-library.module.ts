import { APP_INITIALIZER, Inject, LOCALE_ID, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { UserInterfaceLibraryComponent } from './user-interface-library.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DatePickersModule } from "./modules/date-pickers/date-pickers.module";
import { CoreModule } from './core/core.module';
import { StatusTagsModule } from './modules/status-tags/status-tags.module';
import { SharedModule } from './shared/shared.module';
import { IconsModule } from './modules/icons/icon.module';
import { ButtonsModule } from './modules/buttons/buttons.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Input2Module } from './modules2/input/input.module';
import { FormField2Module } from './modules2/form-field/form-field.module';

export function localeIdFactory(parentLocaleId: string | null) {
  return parentLocaleId || 'en-GB'; // Fallback to 'en-US' if no locale is set
}

@NgModule({
  declarations: [
    UserInterfaceLibraryComponent,
    ShowcaseComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    CoreModule,
    ToastrModule.forRoot(),
    SharedModule,
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
    FormControlModule,
    DatePickersModule,
    StatusTagsModule,
    IconsModule,
    ButtonsModule,
    Input2Module,
    FormField2Module
  ],
  exports: [
    UserInterfaceLibraryComponent,
    ShowcaseComponent,
  ],
  providers: [
    // {
    //   provide: LOCALE_ID,
    //   useFactory: localeIdFactory,
    //   deps: [[new Inject(LOCALE_ID), new Optional()]] // Get LOCALE_ID if available
    // }
  ]
})

export class UserInterfaceLibraryModule { 
  
}