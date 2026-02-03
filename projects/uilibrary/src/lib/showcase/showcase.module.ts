import { NgModule } from '@angular/core';
import { ShowcaseComponent } from './showcase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
import { PlaygroundModule } from '../playground/playground.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PlaygroundModule
    ],
    exports: [ShowcaseComponent],
    declarations: [
        ShowcaseComponent,
    ],
    providers: [],
})
export class ShowcaseModule { }
