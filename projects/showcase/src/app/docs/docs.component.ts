import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface DocsTile {
  path: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  component: string;
}

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {
  docsTiles: DocsTile[] = [
    {
      path: 'buttons',
      title: 'Buttons',
      description: 'Interactive button components with multiple appearances, sizes, and states for user actions.',
      icon: 'icon-air',
      category: 'Actions',
      component: 'ButtonShowcaseComponent'
    },
    {
      path: 'checkboxes',
      title: 'Checkboxes',
      description: 'Checkbox components for multi-select options with various sizes and configurations.',
      icon: 'icon-check',
      category: 'Form Controls',
      component: 'CheckboxShowcaseComponent'
    },
    {
      path: 'datepicker',
      title: 'Date Picker',
      description: 'Date selection components including single date and date range pickers with validation.',
      icon: 'icon-calendar',
      category: 'Form Controls',
      component: 'DatepickerShowcaseComponent'
    },
    {
      path: 'icons',
      title: 'Icons',
      description: 'Icon component library with multiple sizes, appearances, and comprehensive icon set.',
      icon: 'icon-star',
      category: 'Visual Elements',
      component: 'IconShowcaseComponent'
    },
    {
      path: 'radios',
      title: 'Radio Buttons',
      description: 'Radio button components for single-select options with groups and dynamic configurations.',
      icon: '',
      category: 'Form Controls',
      component: 'RadioShowcaseComponent'
    },
    {
      path: 'status-tags',
      title: 'Status Tags',
      description: 'Status indicator components with multiple types for displaying state and priority information.',
      icon: 'icon-warning',
      category: 'Visual Elements',
      component: 'StatusTagShowcaseComponent'
    },
    {
      path: 'toasts',
      title: 'Toast Notifications',
      description: 'Toast notification system for temporary, non-intrusive user messages and system feedback.',
      icon: 'icon-info',
      category: 'Feedback',
      component: 'ToastShowcaseComponent'
    },
    {
      path: 'toggles',
      title: 'Toggles',
      description: 'Toggle switch components for binary state controls with various configurations.',
      icon: 'icon-settings',
      category: 'Form Controls',
      component: 'ToggleShowcaseComponent'
    },
    {
      path: 'tooltips',
      title: 'Tooltips',
      description: 'Contextual information tooltips with multiple placements and accessibility features.',
      icon: 'icon-help',
      category: 'Feedback',
      component: 'TooltipShowcaseComponent'
    },
    {
      path: 'navigation',
      title: 'Navigation',
      description: 'Navigation components for application routing and menu structures with content projection.',
      icon: 'icon-menu',
      category: 'Navigation',
      component: 'NavigationShowcaseComponent'
    },
    {
      path: 'formfields',
      title: 'Form Fields',
      description: 'Input field components with labels, validation, prefixes, suffixes, and comprehensive form integration.',
      icon: 'icon-edit',
      category: 'Form Controls',
      component: 'InputShowcaseComponent'
    },
    {
      path: 'selects',
      title: 'Select Dropdowns',
      description: 'Select dropdown components with single/multi-select, custom templates, and search functionality.',
      icon: 'icon-arrow-down',
      category: 'Form Controls',
      component: 'SelectShowcaseComponent'
    }
  ];

  categories: string[] = [];
  selectedCategory: string = 'All';
  searchTerm: string = '';
  hoveredTile: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Extract unique categories
    this.categories = ['All', ...new Set(this.docsTiles.map(tile => tile.category))];
  }

  getFilteredTiles(): DocsTile[] {
    let filtered = this.docsTiles;
    
    // Filter by category
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(tile => tile.category === this.selectedCategory);
    }
    
    // Filter by search term
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(tile => 
        tile.title.toLowerCase().includes(search) ||
        tile.description.toLowerCase().includes(search) ||
        tile.category.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  }

  navigateToComponent(tile: DocsTile): void {
    this.router.navigate(['/docs', tile.path]);
  }

  onTileHover(tilePath: string): void {
    this.hoveredTile = tilePath;
  }

  onTileLeave(): void {
    this.hoveredTile = null;
  }

  getCategoryCount(category: string): number {
    if (category === 'All') {
      return this.docsTiles.length;
    }
    return this.docsTiles.filter(tile => tile.category === category).length;
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  trackByPath(index: number, tile: DocsTile): string {
    return tile.path;
  }
}
