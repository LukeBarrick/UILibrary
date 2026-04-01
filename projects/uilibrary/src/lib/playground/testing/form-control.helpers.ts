import { AbstractControl } from '@angular/forms';

export function expectControlValid(control: AbstractControl | null): void {
    expect(control).not.toBeNull();
    expect(control!.valid).toBeTrue();
}

export function expectControlInvalid(control: AbstractControl | null): void {
    expect(control).not.toBeNull();
    expect(control!.invalid).toBeTrue();
}

export function expectControlDisabled(control: AbstractControl | null): void {
    expect(control).not.toBeNull();
    expect(control!.disabled).toBeTrue();
}

export function expectControlEnabled(control: AbstractControl | null): void {
    expect(control).not.toBeNull();
    expect(control!.enabled).toBeTrue();
}

export function expectControlTouched(control: AbstractControl | null): void {
    expect(control).not.toBeNull();
    expect(control!.touched).toBeTrue();
}

export function expectControlUntouched(control: AbstractControl | null): void {
    expect(control).not.toBeNull();
    expect(control!.untouched).toBeTrue();
}
