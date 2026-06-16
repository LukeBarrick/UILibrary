import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconConstants } from '../../../../../uilibrary/src/lib/core/constants/icon.constants';

interface IconItem {
  name: string;
  display: string;
  category?: string;
}

@Component({
    selector: 'app-icon-showcase',
    templateUrl: './icon-showcase.component.html',
    styleUrls: ['./icon-showcase.component.css'],
    standalone: false
})
export class IconShowcaseComponent {
  iconDemoForm: FormGroup;
  selectedIcon: IconItem = {
    name: 'icon-accommodation',
    display: 'Accommodation'
  };
  selectedGalleryIcon: IconItem = {
    name: 'icon-accommodation',
    display: 'Accommodation'
  };
  gallerySize: string = 'medium';
  galleryAppearance: string = 'primary';
  iconFilter: string = '';

  gallerySizeItems = [
     'small' ,
     'medium',
     'large'
  ];

  galleryAppearanceItems = [
    'primary',
    'secondary',
    'tertiary',
    'light-gray',
    'dark-gray',
    'custom'
  ];

  availableIcons: IconItem[] = Object.values(IconConstants)
    .map(iconName => ({
      name: iconName,
      display: iconName
    }));

  constructor(private formBuilder: FormBuilder) {
    this.iconDemoForm = this.formBuilder.group({
      search: [''],
      location: ['']
    });
  }

  getSelectedIconDisplay(): string {
    return this.selectedIcon ? this.selectedIcon.display : '';
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
}
