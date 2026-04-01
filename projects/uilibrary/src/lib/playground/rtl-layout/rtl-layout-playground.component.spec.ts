import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { RtlLayoutPlaygroundComponent } from './rtl-layout-playground.component';
import { PlaygroundModule } from '../playground.module';
import { RtlLayoutDirective } from '../../modules/rtl-layout/rtl-layout.directive';
import { RtlLayoutModule } from '../../modules/rtl-layout/rtl-layout.module';
import {
    expectControlInvalid,
    expectControlValid,
    expectControlDisabled,
} from '../testing/form-control.helpers';

describe('RtlLayoutPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(RtlLayoutPlaygroundComponent, PlaygroundModule).keep(ReactiveFormsModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(RtlLayoutPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('direction should default to "ltr"', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.direction).toBe('ltr');
        });
    });

    describe('isRtl getter', () => {
        it('should return false when direction is "ltr"', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            comp.direction = 'ltr';
            expect(comp.isRtl).toBeFalse();
        });

        it('should return true when direction is "rtl"', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            comp.direction = 'rtl';
            expect(comp.isRtl).toBeTrue();
        });
    });

    describe('setDirection()', () => {
        it('should set direction to "rtl"', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            comp.setDirection('rtl');
            expect(comp.direction).toBe('rtl');
        });

        it('should set direction to "ltr"', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            comp.setDirection('rtl');
            comp.setDirection('ltr');
            expect(comp.direction).toBe('ltr');
        });

        it('isRtl getter should update after setDirection()', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.isRtl).toBeFalse();
            comp.setDirection('rtl');
            expect(comp.isRtl).toBeTrue();
            comp.setDirection('ltr');
            expect(comp.isRtl).toBeFalse();
        });
    });

    describe('flexItems', () => {
        it('should contain exactly 4 items', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.flexItems.length).toBe(4);
        });

        it('each item should have a label and a color property', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            comp.flexItems.forEach(item => {
                expect(item.label).toBeTruthy();
                expect(item.color).toBeTruthy();
            });
        });
    });

    describe('countryItems', () => {
        it('should contain 4 SelectOption entries', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.countryItems.length).toBe(4);
        });

        it('each country should have an id and a name', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            comp.countryItems.forEach(item => {
                expect(item.id).toBeGreaterThan(0);
                expect(item.name).toBeTruthy();
            });
        });
    });

    describe('spacerKeys', () => {
        it('should be [0, 1, 2, 3, 4, 5]', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.spacerKeys).toEqual([0, 1, 2, 3, 4, 5]);
        });
    });

    describe('inputForm', () => {
        it('name control should initialise to empty string', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.inputForm.get('name')?.value).toBe('');
        });

        it('message control should initialise to empty string', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.inputForm.get('message')?.value).toBe('');
        });
    });

    describe('selectForm', () => {
        it('country control should initialise with no value', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.selectForm.get('country')?.value).toBeNull();
        });
    });

    describe('datepickerForm', () => {
        it('singleDate should have no value', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.datepickerForm.get('singleDate')?.value).toBeNull();
        });

        it('presetDate should initialise to a Date instance', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.datepickerForm.get('presetDate')?.value).toBeInstanceOf(Date);
        });

        it('presetDate should be valid (satisfies required validator)', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expectControlValid(comp.datepickerForm.get('presetDate'));
        });

        it('rangeStart should have no value', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.datepickerForm.get('rangeStart')?.value).toBeNull();
        });

        it('rangeEnd should have no value', () => {
            const { componentInstance: comp } = MockRender(RtlLayoutPlaygroundComponent).point;
            expect(comp.datepickerForm.get('rangeEnd')?.value).toBeNull();
        });
    });
});

// ─── RtlLayoutDirective direct API tests ─────────────────────────────────────
describe('RtlLayoutDirective', () => {
    beforeEach(() => MockBuilder(RtlLayoutDirective, RtlLayoutModule));

    it('should expose dir="ltr", isRtl=false, isLtr=true when direction is ltr', () => {
        const fixture = MockRender('<div [uiRtlLayout]="dir"></div>', { dir: 'ltr' });
        fixture.detectChanges();
        const directive = ngMocks.findInstance(RtlLayoutDirective);
        expect(directive.dir).toBe('ltr');
        expect(directive.isRtl).toBeFalse();
        expect(directive.isLtr).toBeTrue();
    });

    it('should expose dir="rtl", isRtl=true, isLtr=false when direction is rtl', () => {
        const fixture = MockRender('<div [uiRtlLayout]="dir"></div>', { dir: 'rtl' });
        fixture.detectChanges();
        const directive = ngMocks.findInstance(RtlLayoutDirective);
        expect(directive.dir).toBe('rtl');
        expect(directive.isRtl).toBeTrue();
        expect(directive.isLtr).toBeFalse();
    });

    it('should default to ltr when direction is an empty string', () => {
        const fixture = MockRender('<div [uiRtlLayout]="dir"></div>', { dir: '' });
        fixture.detectChanges();
        const directive = ngMocks.findInstance(RtlLayoutDirective);
        expect(directive.dir).toBe('ltr');
        expect(directive.isRtl).toBeFalse();
        expect(directive.isLtr).toBeTrue();
    });

    it('should update when direction changes from ltr to rtl', () => {
        const fixture = MockRender('<div [uiRtlLayout]="dir"></div>', { dir: 'ltr' });
        fixture.detectChanges();
        const directive = ngMocks.findInstance(RtlLayoutDirective);
        expect(directive.isRtl).toBeFalse();

        fixture.componentInstance.dir = 'rtl';
        fixture.detectChanges();
        expect(directive.isRtl).toBeTrue();
        expect(directive.dir).toBe('rtl');
    });
});
