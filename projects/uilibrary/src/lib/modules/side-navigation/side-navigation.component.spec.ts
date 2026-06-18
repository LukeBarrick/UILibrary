import { MockBuilder, MockRender } from "ng-mocks"

import { SideNavigationComponent } from './side-navigation.component';
import { SideNavigationModule } from "./side-navigation.module";

describe('SideNavigationComponent', () => {
    beforeEach(() => MockBuilder(SideNavigationComponent, SideNavigationModule)
    .provide({ provide: undefined, useValue: undefined}));

    it('should create', () => {
        expect(MockRender(SideNavigationComponent).point.componentInstance).toBeTruthy();
    })
});