import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './button/button.component';
import { RadioGroupComponent } from './group/group.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    RadioButtonComponent,
    RadioGroupComponent
  ],
  exports: [
    RadioButtonComponent,
    RadioGroupComponent
  ]
})
export class RadioModule { }
