import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { SelectPlaygroundComponent } from './select-playground.component';
import { PlaygroundModule } from '../playground.module';
import {
    expectControlDisabled,
    expectControlEnabled,
    expectControlInvalid,
    expectControlTouched,
    expectControlUntouched,
} from '../testing/form-control.helpers';
import { SelectComponent } from '../../modules/select/select.component';
import { SelectModule } from '../../modules/select/select.module';

describe('SelectPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(SelectPlaygroundComponent, PlaygroundModule).keep(ReactiveFormsModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(SelectPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('showOutput @Input should default to false', () => {
            const fixture = TestBed.createComponent(SelectPlaygroundComponent);
            expect(fixture.componentInstance.showOutput).toBeFalse();
        });

        it('items array should contain exactly 3 items', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.items.length).toBe(3);
        });

        it('items should have correct id and value properties', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.items[0]).toEqual({ id: 1, value: 'Item 1' });
            expect(comp.items[1]).toEqual({ id: 2, value: 'Item 2' });
            expect(comp.items[2]).toEqual({ id: 3, value: 'Item 3' });
        });

        it('basicSelectIsDisabled should default to true', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.basicSelectIsDisabled).toBeTrue();
        });

        it('multiSelectBindingIsDisabled should default to true', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.multiSelectBindingIsDisabled).toBeTrue();
        });

        it('multiSelectBindingPreset should initialise with first two items', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.multiSelectBindingPreset.length).toBe(2);
            expect(comp.multiSelectBindingPreset[0].id).toBe(1);
            expect(comp.multiSelectBindingPreset[1].id).toBe(2);
        });
    });

    describe('ngOnInit — error state marking', () => {
        it('formControlSelectError should be marked as touched', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlTouched(comp.formControlSelectForm.get('formControlSelectError'));
        });

        it('customFormControlSelectError should be marked as touched', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlTouched(comp.customTemplateFormControlSelectForm.get('customFormControlSelectError'));
        });

        it('multiSelectError in multiSelectDefaultForm should be marked as touched', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlTouched(comp.multiSelectDefaultForm.get('multiSelectError'));
        });

        it('customMultiSelectError in multiSelectCustomForm should be marked as touched', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlTouched(comp.multiSelectCustomForm.get('customMultiSelectError'));
        });

        it('formControlSelectUntouched should NOT be marked as touched', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlUntouched(comp.formControlSelectForm.get('formControlSelectUntouched'));
        });

        it('multiSelectUntouched should NOT be marked as touched', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlUntouched(comp.multiSelectDefaultForm.get('multiSelectUntouched'));
        });
    });

    describe('formControlSelectForm initialisation', () => {
        it('formControlSelect should have no initial value', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.formControlSelectForm.get('formControlSelect')?.value).toBeNull();
        });

        it('formControlSelectWithValue should initialise to items[0]', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.formControlSelectForm.get('formControlSelectWithValue')?.value).toEqual({ id: 1, value: 'Item 1' });
        });

        it('formControlSelectDisabled should be disabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlDisabled(comp.formControlSelectForm.get('formControlSelectDisabled'));
        });

        it('formControlSelectError should be invalid (required)', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlInvalid(comp.formControlSelectForm.get('formControlSelectError'));
        });

        it('formControlSelectUntouched should be invalid (required)', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlInvalid(comp.formControlSelectForm.get('formControlSelectUntouched'));
        });
    });

    describe('customTemplateFormControlSelectForm initialisation', () => {
        it('customFormControlSelect should have no initial value', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.customTemplateFormControlSelectForm.get('customFormControlSelect')?.value).toBeNull();
        });

        it('customFormControlSelectWithValue should initialise to items[0]', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.customTemplateFormControlSelectForm.get('customFormControlSelectWithValue')?.value)
                .toEqual({ id: 1, value: 'Item 1' });
        });

        it('customFormControlSelectDisabled should be disabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlDisabled(comp.customTemplateFormControlSelectForm.get('customFormControlSelectDisabled'));
        });

        it('customFormControlSelectError should be invalid (required)', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlInvalid(comp.customTemplateFormControlSelectForm.get('customFormControlSelectError'));
        });
    });

    describe('multiSelectDefaultForm initialisation', () => {
        it('multiSelectControl should initialise to empty array', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.multiSelectDefaultForm.get('multiSelectControl')?.value).toEqual([]);
        });

        it('multiSelectWithValue should initialise to [items[0], items[1]]', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const value = comp.multiSelectDefaultForm.get('multiSelectWithValue')?.value;
            expect(value.length).toBe(2);
            expect(value[0].id).toBe(1);
            expect(value[1].id).toBe(2);
        });

        it('multiSelectDisabled should be disabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlDisabled(comp.multiSelectDefaultForm.get('multiSelectDisabled'));
        });

        it('multiSelectError should be invalid (required)', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlInvalid(comp.multiSelectDefaultForm.get('multiSelectError'));
        });
    });

    describe('multiSelectCustomForm initialisation', () => {
        it('customMultiSelectControl should initialise to empty array', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.multiSelectCustomForm.get('customMultiSelectControl')?.value).toEqual([]);
        });

        it('customMultiSelectWithValue should initialise to [items[0], items[1]]', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const value = comp.multiSelectCustomForm.get('customMultiSelectWithValue')?.value;
            expect(value.length).toBe(2);
        });

        it('customMultiSelectDisabled should be disabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlDisabled(comp.multiSelectCustomForm.get('customMultiSelectDisabled'));
        });

        it('customMultiSelectError should be invalid (required)', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expectControlInvalid(comp.multiSelectCustomForm.get('customMultiSelectError'));
        });
    });

    describe('toggleBindingDisabled()', () => {
        it('should toggle basicSelectIsDisabled from true to false', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.basicSelectIsDisabled).toBeTrue();
            comp.toggleBindingDisabled();
            expect(comp.basicSelectIsDisabled).toBeFalse();
        });

        it('should toggle basicSelectIsDisabled back to true on second call', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            comp.toggleBindingDisabled();
            comp.toggleBindingDisabled();
            expect(comp.basicSelectIsDisabled).toBeTrue();
        });
    });

    describe('toggleCustomTemplateBindingDisabled()', () => {
        it('should toggle customTemplateBindingIsDisabled from true to false', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.customTemplateBindingIsDisabled).toBeTrue();
            comp.toggleCustomTemplateBindingDisabled();
            expect(comp.customTemplateBindingIsDisabled).toBeFalse();
        });

        it('should toggle customTemplateBindingIsDisabled back to true on second call', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            comp.toggleCustomTemplateBindingDisabled();
            comp.toggleCustomTemplateBindingDisabled();
            expect(comp.customTemplateBindingIsDisabled).toBeTrue();
        });
    });

    describe('toggleMultiSelectBindingDisabled()', () => {
        it('should toggle multiSelectBindingIsDisabled from true to false', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.multiSelectBindingIsDisabled).toBeTrue();
            comp.toggleMultiSelectBindingDisabled();
            expect(comp.multiSelectBindingIsDisabled).toBeFalse();
        });
    });

    describe('toggleCustomMultiSelectBindingDisabled()', () => {
        it('should toggle customMultiSelectBindingIsDisabled from true to false', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.customMultiSelectBindingIsDisabled).toBeTrue();
            comp.toggleCustomMultiSelectBindingDisabled();
            expect(comp.customMultiSelectBindingIsDisabled).toBeFalse();
        });
    });

    describe('toggleDisabledFormControl()', () => {
        it('should enable formControlSelectDisabled when it is currently disabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const ctrl = comp.formControlSelectForm.get('formControlSelectDisabled')!;
            expect(ctrl.disabled).toBeTrue();
            comp.toggleDisabledFormControl();
            expectControlEnabled(ctrl);
        });

        it('should disable formControlSelectDisabled when it is currently enabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const ctrl = comp.formControlSelectForm.get('formControlSelectDisabled')!;
            ctrl.enable();
            comp.toggleDisabledFormControl();
            expectControlDisabled(ctrl);
        });
    });

    describe('toggleCustomDisabledFormControl()', () => {
        it('should enable customFormControlSelectDisabled when it is currently disabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const ctrl = comp.customTemplateFormControlSelectForm.get('customFormControlSelectDisabled')!;
            expect(ctrl.disabled).toBeTrue();
            comp.toggleCustomDisabledFormControl();
            expectControlEnabled(ctrl);
        });

        it('should disable customFormControlSelectDisabled when it is currently enabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const ctrl = comp.customTemplateFormControlSelectForm.get('customFormControlSelectDisabled')!;
            ctrl.enable();
            comp.toggleCustomDisabledFormControl();
            expectControlDisabled(ctrl);
        });
    });

    describe('toggleMultiSelectDisabledFormControl()', () => {
        it('should enable multiSelectDisabled when it is currently disabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const ctrl = comp.multiSelectDefaultForm.get('multiSelectDisabled')!;
            expect(ctrl.disabled).toBeTrue();
            comp.toggleMultiSelectDisabledFormControl();
            expectControlEnabled(ctrl);
        });

        it('should disable multiSelectDisabled when it is currently enabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const ctrl = comp.multiSelectDefaultForm.get('multiSelectDisabled')!;
            ctrl.enable();
            comp.toggleMultiSelectDisabledFormControl();
            expectControlDisabled(ctrl);
        });
    });

    describe('toggleCustomMultiSelectDisabledFormControl()', () => {
        it('should enable customMultiSelectDisabled when it is currently disabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const ctrl = comp.multiSelectCustomForm.get('customMultiSelectDisabled')!;
            expect(ctrl.disabled).toBeTrue();
            comp.toggleCustomMultiSelectDisabledFormControl();
            expectControlEnabled(ctrl);
        });

        it('should disable customMultiSelectDisabled when it is currently enabled', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            const ctrl = comp.multiSelectCustomForm.get('customMultiSelectDisabled')!;
            ctrl.enable();
            comp.toggleCustomMultiSelectDisabledFormControl();
            expectControlDisabled(ctrl);
        });
    });

    describe('exampleCompareFn()', () => {
        it('should return true when both items have the same id', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.exampleCompareFn({ id: 1 }, { id: 1 })).toBeTrue();
        });

        it('should return false when items have different ids', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.exampleCompareFn({ id: 1 }, { id: 2 })).toBeFalse();
        });

        it('should return false when second argument lacks an id', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.exampleCompareFn({ id: 1 }, {})).toBeFalse();
        });
    });

    describe('stringify()', () => {
        it('should return JSON string of an object', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.stringify({ id: 1 })).toBe('{"id":1}');
        });

        it('should return JSON string of null', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.stringify(null)).toBe('null');
        });

        it('should return JSON string of an array', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.stringify([1, 2])).toBe('[1,2]');
        });
    });

    describe('Advanced options state', () => {
        it('objectItems should contain 3 entries with id and name', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.objectItems.length).toBe(3);
            comp.objectItems.forEach(item => {
                expect(item.id).toBeDefined();
                expect(item.name).toBeDefined();
            });
        });

        it('virtualScrollItems should contain 200 entries', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.virtualScrollItems.length).toBe(200);
        });

        it('virtualScrollItems ids should be sequential starting from 1', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.virtualScrollItems[0].id).toBe(1);
            expect(comp.virtualScrollItems[199].id).toBe(200);
        });

        it('customSearchFn should return true when term matches item name', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.customSearchFn('apple', { name: 'Apple' })).toBeTrue();
        });

        it('customSearchFn should return false when term does not match item name', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.customSearchFn('xyz', { name: 'Apple' })).toBeFalse();
        });

        it('customSearchFn should be case-insensitive', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.customSearchFn('APPLE', { name: 'apple' })).toBeTrue();
        });

        it('customTrackByFn should return the item id', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(comp.customTrackByFn({ id: 42, name: 'Test' })).toBe(42);
        });

        it('onScrollHandler should be a function', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(typeof comp.onScrollHandler).toBe('function');
        });

        it('onScrollToEndHandler should be a function', () => {
            const { componentInstance: comp } = MockRender(SelectPlaygroundComponent).point;
            expect(typeof comp.onScrollToEndHandler).toBe('function');
        });
    });

    describe('Advanced options — Template', () => {
        it('should render a uilibrary-select with [loading]="true"', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const loadingSelects = selects.filter(s => ngMocks.input(s, 'loading') === true);
            expect(loadingSelects.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with loadingText set', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withLoadingText = selects.filter(s => !!ngMocks.input(s, 'loadingText'));
            expect(withLoadingText.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with ariaLabel set', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withAriaLabel = selects.filter(s => !!ngMocks.input(s, 'ariaLabel'));
            expect(withAriaLabel.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [readonly]="true"', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const readonlySelects = selects.filter(s => ngMocks.input(s, 'readonly') === true);
            expect(readonlySelects.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with notFoundText set', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withNotFound = selects.filter(s => !!ngMocks.input(s, 'notFoundText'));
            expect(withNotFound.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [markFirst]="true"', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withMarkFirst = selects.filter(s => ngMocks.input(s, 'markFirst') === true);
            expect(withMarkFirst.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [searchable]="true"', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const searchableSelects = selects.filter(s => ngMocks.input(s, 'searchable') === true);
            expect(searchableSelects.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [searchFn] bound', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withSearchFn = selects.filter(s => !!ngMocks.input(s, 'searchFn'));
            expect(withSearchFn.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [trackByFn] bound', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withTrackBy = selects.filter(s => !!ngMocks.input(s, 'trackByFn'));
            expect(withTrackBy.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [clearOnBackspace]="false"', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withClearOnBackspace = selects.filter(s => ngMocks.input(s, 'clearOnBackspace') === false);
            expect(withClearOnBackspace.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [virtualScroll]="true"', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withVirtualScroll = selects.filter(s => ngMocks.input(s, 'virtualScroll') === true);
            expect(withVirtualScroll.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [inputAttrs] bound', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withInputAttrs = selects.filter(s => !!ngMocks.input(s, 'inputAttrs'));
            expect(withInputAttrs.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [scrollToEnd] bound', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withScrollToEnd = selects.filter(s => !!ngMocks.input(s, 'scrollToEnd'));
            expect(withScrollToEnd.length).toBeGreaterThan(0);
        });

        it('should render a uilibrary-select with [onScroll] bound', () => {
            MockRender(SelectPlaygroundComponent);
            const selects = ngMocks.findAll('uilibrary-select');
            const withOnScroll = selects.filter(s => !!ngMocks.input(s, 'onScroll'));
            expect(withOnScroll.length).toBeGreaterThan(0);
        });
    });
});

// ─── SelectComponent direct API tests ────────────────────────────────────────
describe('SelectComponent', () => {
    beforeEach(() => MockBuilder(SelectComponent, SelectModule));

    it('should create', () => {
        const comp = TestBed.createComponent(SelectComponent).componentInstance;
        expect(comp).toBeTruthy();
    });

    describe('loading / loadingText inputs', () => {
        it('loading should default to false', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.loading).toBeFalse();
        });

        it('loading should accept true', () => {
            const { componentInstance: comp } = MockRender(SelectComponent, { loading: true }).point;
            expect(comp.loading).toBeTrue();
        });

        it('loadingText should default to "Loading..."', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.loadingText).toBe('Loading...');
        });

        it('loadingText should accept a custom string', () => {
            const { componentInstance: comp } = MockRender(SelectComponent, { loadingText: 'Fetching...' }).point;
            expect(comp.loadingText).toBe('Fetching...');
        });
    });

    describe('ariaLabel input', () => {
        it('should default to empty string', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.ariaLabel).toBe('');
        });

        it('should accept a custom label', () => {
            const { componentInstance: comp } = MockRender(SelectComponent, { ariaLabel: 'Select an item' }).point;
            expect(comp.ariaLabel).toBe('Select an item');
        });
    });

    describe('readonly input', () => {
        it('should default to false', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.readonly).toBeFalse();
        });

        it('should accept true', () => {
            const { componentInstance: comp } = MockRender(SelectComponent, { readonly: true }).point;
            expect(comp.readonly).toBeTrue();
        });
    });

    describe('notFoundText input', () => {
        it('should default to "No options found."', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.notFoundText).toBe('No options found.');
        });

        it('should accept a custom string', () => {
            const { componentInstance: comp } = MockRender(SelectComponent, { notFoundText: 'Nothing here' }).point;
            expect(comp.notFoundText).toBe('Nothing here');
        });
    });

    describe('markFirst input', () => {
        it('should default to false', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.markFirst).toBeFalse();
        });

        it('should accept true', () => {
            const { componentInstance: comp } = MockRender(SelectComponent, { markFirst: true }).point;
            expect(comp.markFirst).toBeTrue();
        });
    });

    describe('clearOnBackspace input', () => {
        it('should default to true', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.clearOnBackspace).toBeTrue();
        });

        it('should accept false', () => {
            const { componentInstance: comp } = MockRender(SelectComponent, { clearOnBackspace: false }).point;
            expect(comp.clearOnBackspace).toBeFalse();
        });
    });

    describe('searchable input', () => {
        it('should default to false', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.searchable).toBeFalse();
        });

        it('should accept true', () => {
            const { componentInstance: comp } = MockRender(SelectComponent, { searchable: true }).point;
            expect(comp.searchable).toBeTrue();
        });
    });

    describe('virtualScroll input', () => {
        it('should default to false', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.virtualScroll).toBeFalse();
        });

        it('should accept true', () => {
            const { componentInstance: comp } = MockRender(SelectComponent, { virtualScroll: true }).point;
            expect(comp.virtualScroll).toBeTrue();
        });
    });

    describe('searchFn input', () => {
        it('should default to undefined', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.searchFn).toBeUndefined();
        });

        it('should accept a function', () => {
            const fn = (term: string, item: any) => true;
            const { componentInstance: comp } = MockRender(SelectComponent, { searchFn: fn }).point;
            expect(comp.searchFn).toEqual(jasmine.any(Function));
        });
    });

    describe('trackByFn input', () => {
        it('should default to undefined', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.trackByFn).toBeUndefined();
        });

        it('should accept a function', () => {
            const fn = (item: any) => item.id;
            const { componentInstance: comp } = MockRender(SelectComponent, { trackByFn: fn }).point;
            expect(comp.trackByFn).toEqual(jasmine.any(Function));
        });
    });

    describe('inputAttrs input', () => {
        it('should default to an object with an empty key', () => {
            const comp = TestBed.createComponent(SelectComponent).componentInstance;
            expect(comp.inputAttrs).toEqual({ '': '' });
        });

        it('should accept a custom attrs object', () => {
            const attrs = { 'data-testid': 'my-select' };
            const { componentInstance: comp } = MockRender(SelectComponent, { inputAttrs: attrs }).point;
            expect(comp.inputAttrs).toBe(attrs);
        });
    });
});
