import { NgModule } from '@angular/core';
import { ShowcaseComponent } from './showcase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaygroundModule } from '../playground/playground.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PlaygroundModule
    ],
    exports: [ShowcaseComponent],
    declarations: [
        ShowcaseComponent,
    ],
    providers: [],
})
export class ShowcaseModule { }
