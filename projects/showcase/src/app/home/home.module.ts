import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import {
  ButtonModule,
  CheckboxesModule,
  DatepickerModule,
  FormFieldModule,
  IconModule,
  InputModule,
  InputAnnotationsModule,
  NavigationModule,
  RadioModule,
  SelectModule,
  StatusTagsModule,
  TableModule,
  ToggleModule,
} from 'uilibrary';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxesModule,
    DatepickerModule,
    FormFieldModule,
    IconModule,
    InputModule,
    InputAnnotationsModule,
    NavigationModule,
    RadioModule,
    SelectModule,
    StatusTagsModule,
    TableModule,
    ToggleModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
