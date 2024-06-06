import { NgModule } from '@angular/core';
import { UserInterfaceLibraryComponent } from './user-interface-library.component';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [
    UserInterfaceLibraryComponent,
    TestComponent
  ],
  imports: [
  ],
  exports: [
    UserInterfaceLibraryComponent,
    TestComponent
  ]
})
export class UserInterfaceLibraryModule { }
