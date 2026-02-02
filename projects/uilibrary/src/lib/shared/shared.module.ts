import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({ exports: [], imports: [CommonModule], providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] })

export class SharedModule {
 
}