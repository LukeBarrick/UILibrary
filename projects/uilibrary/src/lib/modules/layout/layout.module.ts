import { NgModule } from "@angular/core";
import { PanelComponent } from "./panel/panel.component";
import { CardComponent } from "./card/card.component";

@NgModule({
    imports: [

    ],
    declarations: [
        PanelComponent,
        CardComponent
    ],
    exports: [
        PanelComponent,
        CardComponent
    ]
})
export class LayoutModule {}