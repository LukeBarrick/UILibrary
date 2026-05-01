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

  //Provide a custom set of dimensions
  //Used within internal components which icons dimensions do not match any of the constrained options. 
  @Input() customDimensions: [height: number, width: number] = [0,0];

  width: number | undefined;
  height: number | undefined;
  fillColor: string = '';

  constructor() { 
   
  }

  ngOnInit() {
    switch(this.size) {
      case 'small': 
        this.height = 30;
        this.width = 30;
        break;
      case 'medium': 
        this.height = 40;
        this.width = 40;
        break;
      case 'large':
        this.height = 80;
        this.width = 80;
        break;
      default: 
        this.height = 40;
        this.width = 40;
        break;
    }

    const [height, width] = this.customDimensions;
    if(height && width) {
        this.height = height;
        this.width = width;
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
