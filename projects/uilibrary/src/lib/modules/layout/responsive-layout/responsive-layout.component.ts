import { Component, Input } from "@angular/core";
import { MarginSize } from "../../../core/enums/margin-size.enum";

@Component({
    selector: 'uilibrary-responsive-layout',
    templateUrl: './responsive-layout.component.html',
    standalone: false,
})
export class ResponsiveLayoutComponent {
    @Input() marginSize: MarginSize = MarginSize.Large;
    MarginSize = MarginSize;
}