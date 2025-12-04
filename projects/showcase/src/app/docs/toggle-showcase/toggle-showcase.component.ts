import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Settings {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
  analytics: boolean;
}

interface Features {
  experimentalUI: boolean;
  betaFeatures: boolean;
  advancedMode: boolean;
}

@Component({
  selector: 'app-toggle-showcase',
  templateUrl: './toggle-showcase.component.html',
  styleUrls: ['./toggle-showcase.component.css']
})
export class ToggleShowcaseComponent implements OnInit {
  toggles: FormGroup;
  checked: boolean = true;
  isDisabled: boolean = false;
  lastToggleAction: string = '';
  
  settings: Settings = {
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false
  };
  
  features: Features = {
    experimentalUI: false,
    betaFeatures: false,
    advancedMode: false
  };

  constructor(private formBuilder: FormBuilder) {
    this.toggles = this.formBuilder.group({
      toggle1: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
    this.lastToggleAction = `Toggles ${this.isDisabled ? 'disabled' : 'enabled'}`;
  }

  toggleChecked(): void {
    this.checked = !this.checked;
    this.lastToggleAction = `Two-way binding toggle ${this.checked ? 'enabled' : 'disabled'} programmatically`;
  }

  setFormValue(value: boolean): void {
    this.toggles.patchValue({ toggle1: value });
    this.lastToggleAction = `Form control set to ${value ? 'ON' : 'OFF'}`;
  }

  resetForm(): void {
    this.toggles.reset();
    this.lastToggleAction = 'Form reset to default values';
  }

  applySettings(): void {
    // Simulate applying settings
    this.lastToggleAction = 'Settings applied successfully';
    console.log('Applying settings:', this.settings);
    
    // Simulate some logic based on settings
    if (this.settings.darkMode) {
      console.log('Switching to dark mode theme');
    }
    
    if (this.settings.notifications && this.settings.analytics) {
      console.log('Enabling analytics with notifications');
    }
  }

  resetSettings(): void {
    this.settings = {
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false
    };
    this.lastToggleAction = 'Settings reset to defaults';
  }

  logSettings(): void {
    console.log('Current Settings:', this.settings);
    console.log('Current Features:', this.features);
    console.log('Form Value:', this.toggles.value);
    this.lastToggleAction = 'Settings and features logged to console';
  }

  hasEnabledFeatures(): boolean {
    return Object.values(this.features).some(feature => feature === true);
  }

  getEnabledFeaturesList(): string {
    const enabledFeatures = [];
    if (this.features.experimentalUI) enabledFeatures.push('Experimental UI');
    if (this.features.betaFeatures) enabledFeatures.push('Beta Features');
    if (this.features.advancedMode) enabledFeatures.push('Advanced Mode');
    return enabledFeatures.join(', ') || 'None';
  }

  stringify(value: any): string {
    return JSON.stringify(value, null, 2);
  }
}