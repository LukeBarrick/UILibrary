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
  RtlLayoutPlaygroundComponent,
  ModalPlaygroundComponent,
  SidebarDemoProfileComponent,
  SidebarDemoSettingsComponent,
  SidebarRouteBridgeComponent,
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
      { path: 'rtl-layout', component: RtlLayoutPlaygroundComponent },
      { path: 'modal', component: ModalPlaygroundComponent },
      // Sidebar auxiliary routes — activated by SidebarModalService.open()
      // URL form: /playground(sidebar:sidebar-profile)
      // Use SidebarRouteBridgeComponent so the drawer content component is only
      // instantiated once (in the CDK overlay), not also in the hidden outlet.
      { path: 'sidebar-profile', outlet: 'sidebar', component: SidebarRouteBridgeComponent, data: { sidebarComponent: SidebarDemoProfileComponent } },
      { path: 'sidebar-settings', outlet: 'sidebar', component: SidebarRouteBridgeComponent, data: { sidebarComponent: SidebarDemoSettingsComponent } },
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
