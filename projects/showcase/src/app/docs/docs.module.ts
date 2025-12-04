import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonShowcaseComponent } from './button/button-showcase.component';
import { CheckboxShowcaseComponent } from './checkbox-showcase/checkbox-showcase.component';
import { DatepickerShowcaseComponent } from './datepicker-showcase/datepicker-showcase.component';
import { IconShowcaseComponent } from './icon-showcase/icon-showcase.component';
import { InputShowcaseComponent } from './input-showcase/input-showcase.component';
import { RadioShowcaseComponent } from './radio-showcase/radio-showcase.component';
import { SelectShowcaseComponent } from './select-showcase/select-showcase.component';
import { StatusTagShowcaseComponent } from './status-tag-showcase/status-tag-showcase.component';
import { ToastShowcaseComponent } from './toast-showcase/toast-showcase.component';
import { ToggleShowcaseComponent } from './toggle-showcase/toggle-showcase.component';
import { TooltipShowcaseComponent } from './tooltip-showcase/tooltip-showcase.component';
import { ButtonsModule, CheckboxesModule, Datepicker2Module, FormField2Module, Icon2Module, IconsModule, Input2Module, InputAnnotationsModule, NavigationModule, Radio2Module, Select2Module, StatusTagsModule, Toggle2Module } from 'uilibrary';
import { NavigationShowcaseComponent } from './navigation/navigation-showcase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: DocsComponent },
  { path: 'buttons', component: ButtonShowcaseComponent },
  { path: 'checkboxes', component: CheckboxShowcaseComponent },
  { path: 'datepicker', component: DatepickerShowcaseComponent },
  { path: 'icons', component: IconShowcaseComponent },
  { path: 'radios', component: RadioShowcaseComponent },
  { path: 'status-tags', component: StatusTagShowcaseComponent },
  { path: 'toasts', component: ToastShowcaseComponent },
  { path: 'toggles', component: ToggleShowcaseComponent },
  { path: 'tooltips', component: TooltipShowcaseComponent },
  { path: 'navigation', component: NavigationShowcaseComponent },
  { path: 'formfields', component: InputShowcaseComponent },
  { path: 'selects', component: SelectShowcaseComponent },
  // { path: 'icons', component: IconComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    Input2Module,
    Select2Module,
    Datepicker2Module,
    FormField2Module,
    Icon2Module,
    IconsModule,
    Radio2Module,
    Toggle2Module,
    StatusTagsModule,
    CheckboxesModule,
    NavigationModule,
    InputAnnotationsModule,
    ButtonsModule
  ],
  declarations: [
    DocsComponent,
    ButtonShowcaseComponent,
    CheckboxShowcaseComponent,
    DatepickerShowcaseComponent,
    IconShowcaseComponent,
    InputShowcaseComponent,
    RadioShowcaseComponent,
    SelectShowcaseComponent,
    StatusTagShowcaseComponent,
    ToastShowcaseComponent,
    ToggleShowcaseComponent,
    TooltipShowcaseComponent,
    NavigationShowcaseComponent
  ],
})
export class DocumentationModule { }
