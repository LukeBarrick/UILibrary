import { MockBuilder, MockRender } from "ng-mocks";
import { LayoutModule } from "../layout.module";
import { CardComponent } from '../card/card.component';

describe('CardComponent', () => {
    beforeEach(() => MockBuilder(CardComponent, LayoutModule));

    it('should create', () => {
        expect(MockRender(CardComponent).point.componentInstance).toBeTruthy();
    })
});