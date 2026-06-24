import { MockBuilder, MockRender } from "ng-mocks";
import { PanelComponent } from './panel.component';
import { LayoutModule } from '../layout.module';

describe('PanelComponent', () => {
    beforeEach(() => MockBuilder(PanelComponent, LayoutModule));

    it('should create', () => {
        expect(MockRender(PanelComponent).point.componentInstance).toBeTruthy();
    })
});