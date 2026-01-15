import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-checkbox-showcase',
    templateUrl: './checkbox-showcase.component.html',
    styleUrls: ['./checkbox-showcase.component.css'],
    standalone: false
})
export class CheckboxShowcaseComponent implements OnInit {
  checkBoxes: FormGroup;
  checked: boolean = true;
  isDisabled: boolean = false;
  
  // Interactive example properties
  option1: boolean = false;
  option2: boolean = true;
  option3: boolean = false;
  lastAction: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.checkBoxes = this.formBuilder.group({
      checkbox1: [false, Validators.required],
      checkbox2: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
    this.lastAction = `Checkboxes ${this.isDisabled ? 'disabled' : 'enabled'}`;
  }

  toggleAll(event: any): void {
    const checked = event.target.checked;
    this.option1 = checked;
    this.option2 = checked;
    this.option3 = checked;
    this.lastAction = `All options ${checked ? 'selected' : 'deselected'} via master checkbox`;
  }

  get allSelected(): boolean {
    return this.option1 && this.option2 && this.option3;
  }

  get selectedCount(): number {
    return [this.option1, this.option2, this.option3].filter(Boolean).length;
  }

  selectAll(): void {
    this.option1 = true;
    this.option2 = true;
    this.option3 = true;
    this.lastAction = 'All options selected via button';
  }

  clearAll(): void {
    this.option1 = false;
    this.option2 = false;
    this.option3 = false;
    this.lastAction = 'All options cleared via button';
  }

  logSelectedItems(): void {
    const selectedItems = [];
    if (this.option1) selectedItems.push('Option 1');
    if (this.option2) selectedItems.push('Option 2');
    if (this.option3) selectedItems.push('Option 3');
    
    this.lastAction = selectedItems.length > 0 
      ? `Selected items logged: ${selectedItems.join(', ')}`
      : 'No items selected to log';
    
    console.log('Selected checkbox items:', selectedItems);
    console.log('Form values:', this.checkBoxes.value);
  }
}