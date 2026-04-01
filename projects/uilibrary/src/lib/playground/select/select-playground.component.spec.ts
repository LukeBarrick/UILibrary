import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { SelectPlaygroundComponent } from './select-playground.component';
import { PlaygroundModule } from '../playground.module';
import {
    expectControlDisabled,
    expectControlEnabled,
    expectControlInvalid,
    expectControlTouched,
    expectControlUntouched,
} from '../testing/form-control.helpers';

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
});
