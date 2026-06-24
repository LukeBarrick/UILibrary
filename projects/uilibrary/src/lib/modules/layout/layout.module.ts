import { NgModule } from "@angular/core";
import { PanelComponent } from "./panel/panel.component";
import { CardComponent } from "./card/card.component";
import { ResponsiveLayoutComponent } from "./responsive-layout/responsive-layout.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PanelComponent,
        CardComponent,
        ResponsiveLayoutComponent
    ],
    exports: [
        PanelComponent,
        CardComponent,
        ResponsiveLayoutComponent
    ]
})
export class LayoutModule {}