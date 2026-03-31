import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtlLayoutDirective } from './rtl-layout.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [RtlLayoutDirective],
    exports: [RtlLayoutDirective],
})
export class RtlLayoutModule {}
