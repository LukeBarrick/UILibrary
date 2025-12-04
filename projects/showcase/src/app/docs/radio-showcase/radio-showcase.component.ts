import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DynamicOption {
  value: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-radio-showcase',
  templateUrl: './radio-showcase.component.html',
})
export class RadioShowcaseComponent implements OnInit {
  radioButtons2: FormGroup;
  
  singleRadioChecked: boolean = false;
  radioButtonDisabled: boolean = false;
  radioButtonModel: string = 'option-a';
  groupDisabled: boolean = false;
  disabledGroupModel: string = 'blue';
  dynamicSelection: string = '';
  conditionalModel: string = '';
  
  dynamicOptions: DynamicOption[] = [
    { value: 'option-1', label: 'Option 1', description: 'First choice' },
    { value: 'option-2', label: 'Option 2', description: 'Second choice' },
    { value: 'option-3', label: 'Option 3', description: 'Third choice' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.radioButtons2 = this.formBuilder.group({
      radioButton1: [6, Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize with default selections
    this.dynamicSelection = this.dynamicOptions[0].value;
    this.conditionalModel = 'basic';
  }

  toggleSingleRadio(): void {
    this.singleRadioChecked = !this.singleRadioChecked;
  }

  toggleRadioDisabled(): void {
    this.radioButtonDisabled = !this.radioButtonDisabled;
  }

  setRadioValue(value: number): void {
    this.radioButtons2.patchValue({ radioButton1: value });
  }

  toggleGroupDisabled(): void {
    this.groupDisabled = !this.groupDisabled;
  }

  addOption(): void {
    const newOption: DynamicOption = {
      value: `option-${this.dynamicOptions.length + 1}`,
      label: `Option ${this.dynamicOptions.length + 1}`,
      description: 'Dynamically added'
    };
    this.dynamicOptions.push(newOption);
  }

  removeLastOption(): void {
    if (this.dynamicOptions.length > 1) {
      const removedOption = this.dynamicOptions.pop();
      // If the removed option was selected, select the first option
      if (removedOption && this.dynamicSelection === removedOption.value) {
        this.dynamicSelection = this.dynamicOptions[0].value;
      }
    }
  }

  shuffleOptions(): void {
    // Fisher-Yates shuffle algorithm
    for (let i = this.dynamicOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.dynamicOptions[i], this.dynamicOptions[j]] = [this.dynamicOptions[j], this.dynamicOptions[i]];
    }
  }

  trackByValue(index: number, option: DynamicOption): string {
    return option.value;
  }

  getSelectedOptionLabel(): string {
    const selected = this.dynamicOptions.find(opt => opt.value === this.dynamicSelection);
    return selected ? `${selected.label} - ${selected.description}` : 'None selected';
  }

  getPlanDescription(): string {
    switch (this.conditionalModel) {
      case 'basic':
        return 'Basic Plan - Perfect for getting started with essential features at no cost.';
      case 'premium':
        return 'Premium Plan - Advanced features and priority support for growing businesses.';
      case 'enterprise':
        return 'Enterprise Plan - Full feature suite with dedicated support and custom integrations.';
      default:
        return 'No plan selected';
    }
  }
}