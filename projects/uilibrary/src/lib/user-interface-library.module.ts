import { APP_INITIALIZER, Inject, LOCALE_ID, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { UserInterfaceLibraryComponent } from './user-interface-library.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { NavigationModule } from './modules/navigation/navigation.module';
import { CheckboxesModule } from './modules/checkboxes/checkboxes.module';
import { InputAnnotationsModule } from './modules/input-annotations/input-annotations.module';
import { CoreModule } from './core/core.module';
import { StatusTagsModule } from './modules/status-tags/status-tags.module';
import { SharedModule } from './shared/shared.module';
import { ButtonModule } from './modules/button/button.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputModule } from './modules/input/input.module';
import { FormFieldModule } from './modules/form-field/form-field.module';
import { SelectModule } from './modules/select/select.module';
import { IconModule } from './modules/icon/icon.module';
import { ToggleModule } from './modules/toggle/toggle.module';
import { RadioModule } from './modules/radio/radio.module';
import { DatepickerModule } from './modules/datepicker/datepicker.module';
import { KeyboardNavigationModule } from './modules/keyboard-navigation/keyboard-navigation.module';
import { ContextMenuModule } from './modules/context-menu/context-menu.module';
import { TableModule } from './modules/table/table.module';
import { UiModalModule } from './modules/modal/modal.module';
import { SidebarModalModule } from './modules/modal/sidebar-modal.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { PlaygroundModule } from './playground/playground.module';
import { RtlLayoutModule } from '../public-api';

@NgModule({
  declarations: [
    UserInterfaceLibraryComponent,
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
    ShowcaseModule,
    CheckboxesModule,
    InputAnnotationsModule,
    NavigationModule,
    StatusTagsModule,
    ButtonModule,
    InputModule,
    FormFieldModule,
    SelectModule,
    IconModule,
    ToggleModule,
    RadioModule,
    DatepickerModule,
    KeyboardNavigationModule,
    ContextMenuModule,
    TableModule,
    UiModalModule,
    SidebarModalModule,
    RtlLayoutModule
  ],
  exports: [
    UserInterfaceLibraryComponent,
  ],
  providers: [

  ]
})

export class UserInterfaceLibraryModule { 
  
}