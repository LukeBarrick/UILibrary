import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tooltip-showcase',
  templateUrl: './tooltip-showcase.component.html',
  styleUrls: ['./tooltip-showcase.component.css']
})
export class TooltipShowcaseComponent implements OnInit {
  demoForm: FormGroup;
  showDynamic: boolean = false;
  dynamicTooltipContent: string = '';
  isActive: boolean = true;
  progressValue: number = 45;

  constructor(private formBuilder: FormBuilder) {
    this.demoForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  showDynamicTooltip(): void {
    this.showDynamic = true;
    const currentTime = new Date().toLocaleTimeString();
    this.dynamicTooltipContent = `Generated at ${currentTime}. This tooltip was created dynamically with real-time content.`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      this.showDynamic = false;
    }, 3000);
  }

  toggleStatus(): void {
    this.isActive = !this.isActive;
  }

  updateProgress(): void {
    // Simulate progress update
    this.progressValue = Math.min(100, this.progressValue + Math.floor(Math.random() * 20) + 5);
    
    if (this.progressValue >= 100) {
      this.progressValue = 100;
      setTimeout(() => {
        this.progressValue = Math.floor(Math.random() * 30) + 10; // Reset to random starting point
      }, 2000);
    }
  }

  getEstimatedTime(): number {
    // Calculate estimated completion time based on current progress
    const remainingProgress = 100 - this.progressValue;
    const estimatedMinutes = Math.ceil(remainingProgress * 0.5); // Rough estimate
    return Math.max(1, estimatedMinutes);
  }

  resetDemo(): void {
    this.demoForm.reset();
    this.showDynamic = false;
    this.isActive = true;
    this.progressValue = 45;
  }

  logFormStatus(): void {
    console.log('Form Status:', {
      valid: this.demoForm.valid,
      value: this.demoForm.value,
      errors: this.getFormErrors()
    });
  }

  getFormErrors(): any {
    const formErrors: any = {};
    
    Object.keys(this.demoForm.controls).forEach(key => {
      const controlErrors = this.demoForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });
    
    return formErrors;
  }

  hasFormErrors(): boolean {
    return !this.demoForm.valid && this.demoForm.touched;
  }

  getFormErrorCount(): number {
    let errorCount = 0;
    Object.keys(this.demoForm.controls).forEach(key => {
      const control = this.demoForm.get(key);
      if (control?.errors && control.touched) {
        errorCount++;
      }
    });
    return errorCount;
  }
}