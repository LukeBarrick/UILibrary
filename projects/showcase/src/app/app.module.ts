import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { UserInterfaceLibraryModule } from 'uilibrary';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    ToastrModule.forRoot(),
    UserInterfaceLibraryModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
