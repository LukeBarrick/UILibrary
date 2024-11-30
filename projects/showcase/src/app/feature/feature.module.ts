import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { UserInterfaceLibraryModule } from "../../../../uilibrary/src/lib/user-interface-library.module";

@NgModule({
  imports: [
    CommonModule,
    UserInterfaceLibraryModule
],
  declarations: [
    FeatureComponent,
    ShowcaseComponent
  ],
  exports: [

  ]
})
export class FeatureModule { }
