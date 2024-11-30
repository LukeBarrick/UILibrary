import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInterfaceLibraryModule } from 'uilibrary';
import { RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FeatureModule } from './feature/feature.module';
import { SharedModule } from '../../../../dist/uilibrary/lib/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    FeatureModule,
    ToastrModule.forRoot(),
    UserInterfaceLibraryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
