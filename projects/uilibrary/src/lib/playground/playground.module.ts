import { NgModule } from '@angular/core';

import { ButtonPlaygroundComponent } from './button/button-playground.component';
import { CheckboxPlaygroundComponent } from './checkbox/checkbox-playground.component';
import { ContextMenuPlaygroundComponent } from './context-menu/context-menu-playground.component';
import { DatePickerPlaygroundComponent } from './datepicker/datepicker-playground.component';
import { FormFieldPlaygroundComponent } from './form-field/form-field-playground.component';
import { IconPlaygroundComponent } from './icon/icon-playground.component';
import { InputPlaygroundComponent } from './input/input-playground.component';
import { InputAnnotationsPlaygroundComponent } from './input-annotations/input-annotations-playground.component';
import { KeyboardNavigationPlaygroundComponent } from './keyboard-navigation/keyboard-navigation-playground.component';
import { NavigationPlaygroundComponent } from './navigation/navigation-playground.component';
import { RadioPlaygroundComponent } from './radio/radio-playground.component';
import { SelectPlaygroundComponent } from './select/select-playground.component';
import { TablePlaygroundComponent } from './table/table-playground.component';
import { TogglePlaygroundComponent } from './toggle/toggle-playground.component';
import { TypographyPlaygroundComponent } from './typography/typography-playground.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxesModule } from '../modules/checkboxes/checkboxes.module';
import { InputAnnotationsModule } from '../modules/input-annotations/input-annotations.module';
import { NavigationModule } from '../modules/navigation/navigation.module';
import { StatusTagsModule } from '../modules/status-tags/status-tags.module';
import { ButtonModule } from '../modules/button/button.module';
import { InputModule } from '../modules/input/input.module';
import { FormFieldModule } from '../modules/form-field/form-field.module';
import { SelectModule } from '../modules/select/select.module';
import { IconModule } from '../modules/icon/icon.module';
import { ToggleModule } from '../modules/toggle/toggle.module';
import { RadioModule } from '../modules/radio/radio.module';
import { DatepickerModule } from '../modules/datepicker/datepicker.module';
import { KeyboardNavigationModule } from '../modules/keyboard-navigation/keyboard-navigation.module';
import { ContextMenuModule } from '../modules/context-menu/context-menu.module';
import { TableModule } from '../modules/table/table.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
    ],
    exports: [
        ButtonPlaygroundComponent,
        CheckboxPlaygroundComponent,
        ContextMenuPlaygroundComponent,
        DatePickerPlaygroundComponent,
        FormFieldPlaygroundComponent,
        IconPlaygroundComponent,
        InputPlaygroundComponent,
        InputAnnotationsPlaygroundComponent,
        KeyboardNavigationPlaygroundComponent,
        NavigationPlaygroundComponent,
        RadioPlaygroundComponent,
        SelectPlaygroundComponent,
        TablePlaygroundComponent,
        TogglePlaygroundComponent,
        TypographyPlaygroundComponent,

        //Temporary exports for Showcase whilst these modules are still in use there 
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
    ],
    declarations: [
        ButtonPlaygroundComponent,
        CheckboxPlaygroundComponent,
        ContextMenuPlaygroundComponent,
        DatePickerPlaygroundComponent,
        FormFieldPlaygroundComponent,
        IconPlaygroundComponent,
        InputPlaygroundComponent,
        InputAnnotationsPlaygroundComponent,
        KeyboardNavigationPlaygroundComponent,
        NavigationPlaygroundComponent,
        RadioPlaygroundComponent,
        SelectPlaygroundComponent,
        TablePlaygroundComponent,
        TogglePlaygroundComponent,
        TypographyPlaygroundComponent
    ],
    providers: [],
})
export class PlaygroundModule { }
