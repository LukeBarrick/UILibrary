import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HintComponent } from './hint/hint.component';
import { RequiredComponent } from './required/required.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    HintComponent,
    RequiredComponent,
    TooltipComponent
  ],
  exports: [
    HintComponent,
    RequiredComponent,
    TooltipComponent
  ]
})
export class InputAnnotationsModule { }
