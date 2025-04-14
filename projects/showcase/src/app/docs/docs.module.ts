import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { RouterModule, Routes } from '@angular/router';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputModule } from './input/input.module';
import { InputComponent } from './input/input.component';
import { FormFieldModule } from './form-field/form-field.module';
import { SelectComponent } from './select/select.component';
import { SelectModule } from './select/select.module';
import { IconModule } from './icon/icon.module';
import { IconComponent } from './icon/icon.component';

const routes: Routes = [
  { path: '', component: DocsComponent },
  { path: 'formfields', component: FormFieldComponent },
  { path: 'inputs', component: InputComponent },
  { path: 'selects', component: SelectComponent},
  { path: 'icons', component: IconComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputModule,
    FormFieldModule,
    SelectModule,
    IconModule
  ],
  declarations: [
    DocsComponent
  ],
})
export class DocumentationModule { }
