import { NgModule } from '@angular/core';
import { UserInterfaceLibraryComponent } from './user-interface-library.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { HintComponent } from './hint/hint.component';
import { CommonModule } from '@angular/common';
import { RequiredComponent } from './required/required.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipComponent } from './tooltip/tooltip.component';


@NgModule({
  declarations: [
    UserInterfaceLibraryComponent,
    ShowcaseComponent,
    TextInputComponent,
    TextAreaComponent,
    HintComponent,
    RequiredComponent,
    TooltipComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    UserInterfaceLibraryComponent,
    ShowcaseComponent,
    TextInputComponent,
    TextAreaComponent,
    HintComponent,
    RequiredComponent,
    TooltipComponent,
    DropdownComponent
  ]
})
export class UserInterfaceLibraryModule { }
