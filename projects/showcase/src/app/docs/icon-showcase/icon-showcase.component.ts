import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface IconItem {
  name: string;
  display: string;
  category?: string;
}

@Component({
  selector: 'app-icon-showcase',
  templateUrl: './icon-showcase.component.html',
  styleUrls: ['./icon-showcase.component.css']
})
export class IconShowcaseComponent implements OnInit {
  iconDemoForm: FormGroup;
  selectedIcon: string = 'icon-accommodation';
  gallerySize: string = 'medium';
  galleryAppearance: string = 'primary';
  iconFilter: string = '';

  availableIcons: IconItem[] = [
    { name: 'icon-accommodation', display: 'Accommodation', category: 'travel' },
    { name: 'icon-air', display: 'Air Travel', category: 'travel' },
    { name: 'icon-arrow-down', display: 'Arrow Down', category: 'navigation' },
    { name: 'icon-arrow-left', display: 'Arrow Left', category: 'navigation' },
    { name: 'icon-arrow-right', display: 'Arrow Right', category: 'navigation' },
    { name: 'icon-arrow-up', display: 'Arrow Up', category: 'navigation' },
    { name: 'icon-calendar', display: 'Calendar', category: 'general' },
    { name: 'icon-check', display: 'Check Mark', category: 'status' },
    { name: 'icon-close', display: 'Close', category: 'navigation' },
    { name: 'icon-edit', display: 'Edit', category: 'action' },
    { name: 'icon-email', display: 'Email', category: 'communication' },
    { name: 'icon-help', display: 'Help', category: 'general' },
    { name: 'icon-home', display: 'Home', category: 'navigation' },
    { name: 'icon-info', display: 'Information', category: 'general' },
    { name: 'icon-location', display: 'Location', category: 'general' },
    { name: 'icon-menu', display: 'Menu', category: 'navigation' },
    { name: 'icon-phone', display: 'Phone', category: 'communication' },
    { name: 'icon-search', display: 'Search', category: 'action' },
    { name: 'icon-settings', display: 'Settings', category: 'action' },
    { name: 'icon-star', display: 'Star', category: 'status' },
    { name: 'icon-user', display: 'User', category: 'general' },
    { name: 'icon-warning', display: 'Warning', category: 'status' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.iconDemoForm = this.formBuilder.group({
      search: [''],
      location: ['']
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  getSelectedIconDisplay(): string {
    const icon = this.availableIcons.find(icon => icon.name === this.selectedIcon);
    return icon ? icon.display : 'Unknown Icon';
  }

  selectIconFromGallery(iconName: string): void {
    this.selectedIcon = iconName;
  }

  getFilteredIcons(): IconItem[] {
    if (!this.iconFilter.trim()) {
      return this.availableIcons;
    }

    const filter = this.iconFilter.toLowerCase();
    return this.availableIcons.filter(icon => 
      icon.name.toLowerCase().includes(filter) ||
      icon.display.toLowerCase().includes(filter) ||
      (icon.category && icon.category.toLowerCase().includes(filter))
    );
  }

  getIconsByCategory(category: string): IconItem[] {
    return this.availableIcons.filter(icon => icon.category === category);
  }

  getAllCategories(): string[] {
    const categories = new Set(this.availableIcons.map(icon => icon.category!).filter(Boolean));

    return Array.from(categories).sort();
  }

  clearFilter(): void {
    this.iconFilter = '';
  }

  resetGallery(): void {
    this.gallerySize = 'medium';
    this.galleryAppearance = 'primary';
    this.iconFilter = '';
    this.selectedIcon = 'icon-accommodation';
  }

  copyIconCode(iconName?: string): void {
    const name = iconName || this.selectedIcon;
    const code = `<uilibrary-icon name="${name}" size="${this.gallerySize}" appearance="${this.galleryAppearance}"></uilibrary-icon>`;
    
    // Try to copy to clipboard if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        console.log('Icon code copied to clipboard:', code);
      }).catch(err => {
        console.log('Could not copy to clipboard:', err);
        console.log('Icon code:', code);
      });
    } else {
      console.log('Icon code:', code);
    }
  }

  generateIconUsageExample(): string {
    return `// Example usage in component
const iconConfig = {
  name: '${this.selectedIcon}',
  size: '${this.gallerySize}',
  appearance: '${this.galleryAppearance}'
};

// In template
<uilibrary-icon 
  [name]="iconConfig.name" 
  [size]="iconConfig.size" 
  [appearance]="iconConfig.appearance">
</uilibrary-icon>`;
  }

  logIconStats(): void {
    const stats = {
      totalIcons: this.availableIcons.length,
      categories: this.getAllCategories(),
      filteredCount: this.getFilteredIcons().length,
      selectedIcon: {
        name: this.selectedIcon,
        display: this.getSelectedIconDisplay()
      },
      gallerySettings: {
        size: this.gallerySize,
        appearance: this.galleryAppearance,
        filter: this.iconFilter
      }
    };
    
    console.log('Icon Showcase Stats:', stats);
  }
}