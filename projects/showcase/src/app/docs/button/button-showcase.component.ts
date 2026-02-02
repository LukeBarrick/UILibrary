import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-button-showcase',
    templateUrl: './button-showcase.component.html',
    styleUrls: ['./button-showcase.component.css'],
    standalone: false
})
export class ButtonShowcaseComponent implements OnInit {
  isDisabled: boolean = false;
  clickCounter: number = 0;
  isSubmitting: boolean = false;
  isDeleting: boolean = false;
  lastMessage: string = '';

  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
    this.lastMessage = `Buttons ${this.isDisabled ? 'disabled' : 'enabled'}`;
  }

  handleClick(message: string): void {
    this.lastMessage = message;
    console.log(message);
  }

  incrementCounter(): void {
    this.clickCounter++;
    this.lastMessage = `Counter incremented to ${this.clickCounter}`;
  }

  simulateSubmit(): void {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.lastMessage = 'Form submission started...';
    
    // Simulate async operation
    setTimeout(() => {
      this.isSubmitting = false;
      this.lastMessage = 'Form submitted successfully!';
    }, 2000);
  }

  resetForm(): void {
    this.clickCounter = 0;
    this.lastMessage = 'Form reset';
    // Reset any form data here
  }

  simulateDelete(): void {
    if (this.isDeleting) return;
    
    this.isDeleting = true;
    this.lastMessage = 'Deleting item...';
    
    // Simulate async operation
    setTimeout(() => {
      this.isDeleting = false;
      this.lastMessage = 'Item deleted successfully!';
    }, 1500);
  }
}