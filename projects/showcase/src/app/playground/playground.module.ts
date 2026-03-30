import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  PlaygroundModule as UIPlaygroundModule,
  ButtonPlaygroundComponent,
  CheckboxPlaygroundComponent,
  ContextMenuPlaygroundComponent,
  DatePickerPlaygroundComponent,
  FormFieldPlaygroundComponent,
  IconPlaygroundComponent,
  InputPlaygroundComponent,
  InputAnnotationsPlaygroundComponent,
  KeyboardNavigationPlaygroundComponent,
  NavigationPlaygroundComponent,
  RadioPlaygroundComponent,
  SelectPlaygroundComponent,
  TablePlaygroundComponent,
  TogglePlaygroundComponent,
  TypographyPlaygroundComponent,
} from 'uilibrary';
import { PlaygroundLayoutComponent } from './playground-layout/playground-layout.component';
import { PlaygroundSideNavComponent } from './playground-side-nav/playground-side-nav.component';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundLayoutComponent,
    children: [
      { path: '', redirectTo: 'button', pathMatch: 'full' },
      { path: 'button', component: ButtonPlaygroundComponent },
      { path: 'checkbox', component: CheckboxPlaygroundComponent },
      { path: 'context-menu', component: ContextMenuPlaygroundComponent },
      { path: 'datepicker', component: DatePickerPlaygroundComponent },
      { path: 'form-field', component: FormFieldPlaygroundComponent },
      { path: 'icon', component: IconPlaygroundComponent },
      { path: 'input', component: InputPlaygroundComponent },
      { path: 'input-annotations', component: InputAnnotationsPlaygroundComponent },
      { path: 'keyboard-navigation', component: KeyboardNavigationPlaygroundComponent },
      { path: 'navigation', component: NavigationPlaygroundComponent },
      { path: 'radio', component: RadioPlaygroundComponent },
      { path: 'select', component: SelectPlaygroundComponent },
      { path: 'table', component: TablePlaygroundComponent },
      { path: 'toggle', component: TogglePlaygroundComponent },
      { path: 'typography', component: TypographyPlaygroundComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UIPlaygroundModule,
  ],
  declarations: [
    PlaygroundLayoutComponent,
    PlaygroundSideNavComponent,
  ],
})
export class PlaygroundModule {}
