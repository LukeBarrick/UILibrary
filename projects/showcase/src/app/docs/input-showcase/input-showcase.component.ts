import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-input-showcase',
    templateUrl: './input-showcase.component.html',
    styleUrls: ['./input-showcase.component.css'],
    standalone: false
})
export class InputShowcaseComponent implements OnInit {
  textInput: string = '';
  textInputError: string = '';

  textInputs2: FormGroup;
  textAreas2: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.textInputs2 = this.formBuilder.group({
      textInput21: ['', Validators.required],
      textInput22: ['Pre-filled value', Validators.required],
      textInput23: [{value: '', disabled: true}, Validators.required],
      textInput24: [{value: 'Disabled with value', disabled: true}, Validators.required],
      placeholderFormControl: ['', Validators.required],
      prefixFormControl: ['', Validators.required],
      suffixFormControl: ['', Validators.required],
      prefixSuffixFormControl: ['', Validators.required],
      errorInput: ['', Validators.required],
      tooltipInput: [''],
      urlInput: [''],
      phoneInput: ['']
    });

    this.textAreas2 = this.formBuilder.group({
      textArea1: ['', Validators.required],
      placeholderFormControl: ['', Validators.required],
      prefixFormControl: ['', Validators.required],
      suffixFormControl: ['', Validators.required],
      prefixSuffixFormControl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  markAllAsTouched(): void {
    this.textInputs2.markAllAsTouched();
    this.textAreas2.markAllAsTouched();
  }

  debugme(): void {
    console.log('Text Inputs Form:', this.textInputs2.value);
    console.log('Text Areas Form:', this.textAreas2.value);
    console.log('Model Values:', {
      textInput: this.textInput,
      textInputError: this.textInputError
    });
    console.log('Form Validity:', {
      textInputs2Valid: this.textInputs2.valid,
      textAreas2Valid: this.textAreas2.valid
    });
  }
}