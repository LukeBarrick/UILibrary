import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidesComponent } from './guides.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component: GuidesComponent }]  

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuidesComponent]
})
export class GuidesModule { }
