import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { RouterModule, Routes } from '@angular/router';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputModule } from './input/input.module';
import { InputComponent } from './input/input.component';
import { FormFieldModule } from './form-field/form-field.module';

const routes: Routes = [
  { path: '', component: DocsComponent },
  { path: 'formfield', component: FormFieldComponent },
  { path: 'input', component: InputComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputModule,
    FormFieldModule
  ],
  declarations: [
    DocsComponent
  ],
})
export class DocumentationModule { }
