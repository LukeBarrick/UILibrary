import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'uilibrary-icon',
    templateUrl: './icon.component.html',
    standalone: false
})
export class IconComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() size: string | undefined;
  @Input() appearance: string | undefined;

  width: number | undefined;
  height: number | undefined;
  fillColor: string = '';

  constructor() { 
   
  }

  ngOnInit() {
    switch(this.size) {
      case 'small': 
        this.width = 30;
        this.height = 30;
        break;
      case 'medium': 
        this.width = 40;
        this.height = 40;
        break;
      case 'large':
        this.width = 80;
        this.height = 80;
        break;
      default: 
        break;
    }

    switch(this.appearance) {
      case "primary":
        this.fillColor = 'var(--primary)' //TODO refactor the var lol
        break;
      case 'secondary':
        this.fillColor = 'var(--secondary)'
        break;
      case 'tertiary':
        this.fillColor = 'var(--tertiary)'
        break;
      case 'light-gray':
        this.fillColor = 'var(--light-gray)'
        break;
      case 'dark-gray': 
        this.fillColor = 'var(--dark-gray)'
        break;
      case 'custom':
        this.fillColor = 'currentColor'
        break;
      default:
        this.fillColor = 'var(--secondary)'
        break;
    }
  }
}
