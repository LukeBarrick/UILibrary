import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    RadioGroupComponent,
    RadioButtonComponent  
  ],
  exports: [
    RadioGroupComponent,
    RadioButtonComponent  
  ]
})
export class RadioButtonsModule { }
