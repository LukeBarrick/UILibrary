import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { UserInterfaceLibraryModule } from 'uilibrary';
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './home/home.module';
import { DocumentationModule } from './docs/docs.module';
import { GuidesModule } from './guides/guides.module';
import { BlogModule } from './blog/blog.module';

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
    LayoutModule,
    HomeModule,
    DocumentationModule,
    GuidesModule,
    BlogModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
