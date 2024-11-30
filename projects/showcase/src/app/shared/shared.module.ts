import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { UserInterfaceLibraryModule } from 'uilibrary';

@NgModule({
  imports: [
    CommonModule,
    UserInterfaceLibraryModule
  ],
  declarations: [SharedComponent],
  exports: [
    UserInterfaceLibraryModule
  ]
})
export class SharedModule { }
