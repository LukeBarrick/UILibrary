import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { NavigationModule } from "../../../../uilibrary/src/lib/modules/navigation/navigation.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule
],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
