import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { NavigationPlaygroundComponent } from './navigation-playground.component';
import { PlaygroundModule } from '../playground.module';
import { NavigationLinkType } from '../../core/enums/navigation-link-type.enum';

describe('NavigationPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(NavigationPlaygroundComponent, PlaygroundModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(NavigationPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });
    });

    describe('links array', () => {
        it('should contain exactly 4 top-level links', () => {
            const { componentInstance: comp } = MockRender(NavigationPlaygroundComponent).point;
            expect(comp.links.length).toBe(4);
        });

        it('every link should have a non-empty label', () => {
            const { componentInstance: comp } = MockRender(NavigationPlaygroundComponent).point;
            comp.links.forEach(link => expect(link.label).toBeTruthy());
        });

        it('first link should be type Route with path "/"', () => {
            const { componentInstance: comp } = MockRender(NavigationPlaygroundComponent).point;
            const link = comp.links[0];
            expect(link.type).toBe(NavigationLinkType.Route);
            expect(link.path).toBe('/');
        });

        it('second link should be type URL', () => {
            const { componentInstance: comp } = MockRender(NavigationPlaygroundComponent).point;
            expect(comp.links[1].type).toBe(NavigationLinkType.URL);
        });

        it('third link should be type TargetBlankURL', () => {
            const { componentInstance: comp } = MockRender(NavigationPlaygroundComponent).point;
            expect(comp.links[2].type).toBe(NavigationLinkType.TargetBlankURL);
        });

        it('fourth link should be a dropdown parent (Route type) with empty path', () => {
            const { componentInstance: comp } = MockRender(NavigationPlaygroundComponent).point;
            const dropdown = comp.links[3];
            expect(dropdown.type).toBe(NavigationLinkType.Route);
            expect(dropdown.path).toBe('');
        });

        it('dropdown link should have 3 children', () => {
            const { componentInstance: comp } = MockRender(NavigationPlaygroundComponent).point;
            expect(comp.links[3].children?.length).toBe(3);
        });

        it('dropdown link should have hidenLabelOnNestedChildren set to true', () => {
            const { componentInstance: comp } = MockRender(NavigationPlaygroundComponent).point;
            expect(comp.links[3].hidenLabelOnNestedChildren).toBeTrue();
        });

        it('dropdown children should cover all 3 NavigationLinkType variants', () => {
            const { componentInstance: comp } = MockRender(NavigationPlaygroundComponent).point;
            const childTypes = comp.links[3].children!.map(c => c.type);
            expect(childTypes).toContain(NavigationLinkType.Route);
            expect(childTypes).toContain(NavigationLinkType.URL);
            expect(childTypes).toContain(NavigationLinkType.TargetBlankURL);
        });
    });

    describe('Template', () => {
        it('should render 6 uilibrary-navigation elements (one per demo variant)', () => {
            MockRender(NavigationPlaygroundComponent);
            const navElements = ngMocks.findAll('uilibrary-navigation');
            expect(navElements.length).toBe(6);
        });

        it('every uilibrary-navigation should have the same [links] array bound to it', () => {
            const fixture = MockRender(NavigationPlaygroundComponent);
            const comp = fixture.point.componentInstance;
            const navElements = ngMocks.findAll('uilibrary-navigation');
            navElements.forEach(navEl => {
                const linksInput = ngMocks.input(navEl, 'links');
                expect(linksInput).toBe(comp.links);
            });
        });
    });
    describe('navigation input binding coverage', () => {
        it('should bind showRightAlignedContent=true to relevant nav elements', () => {
            MockRender(NavigationPlaygroundComponent);
            const navElements = ngMocks.findAll('uilibrary-navigation');
            // Second nav onwards (index 1+) use showRightAlignedContent=true
            const withRight = navElements.filter(
                el => ngMocks.input(el, 'showRightAlignedContent') === true
            );
            expect(withRight.length).toBeGreaterThan(0);
        });

        it('should bind hideRightAllignedContentOnMobile=true to the last nav element', () => {
            MockRender(NavigationPlaygroundComponent);
            const navElements = ngMocks.findAll('uilibrary-navigation');
            const withHideOnMobile = navElements.filter(
                el => ngMocks.input(el, 'hideRightAllignedContentOnMobile') === true
            );
            expect(withHideOnMobile.length).toBeGreaterThan(0);
        });
    });

});
