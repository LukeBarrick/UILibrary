import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uilibrary-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() size: string | undefined;
  @Input() appearance: string | undefined;
  @Input() disabled: boolean | undefined;
  @Input() aria_label: string | undefined;

  sizeClass: string | undefined;
  appearanceClass: string | undefined;

  constructor() { }

  ngOnInit() {
    if(this.size === 'small') {
      this.sizeClass = 'btn-small';
    } else {
      this.sizeClass = 'btn';
    }

    switch(this.appearance) {
      case 'primary':
        this.appearanceClass = 'btn-primary'
        break;
      case 'secondary':
        this.appearanceClass = 'btn-secondary'
        break;
      case 'primary-success':
        this.appearanceClass = 'btn-primary success'
        break;
      case 'primary-delete':
        this.appearanceClass = 'btn-primary delete'
        break;
      case 'secondary-success':
          this.appearanceClass = 'btn-secondary success'
          break;
      case 'secondary-delete':
          this.appearanceClass = 'btn-secondary delete'
          break;
    }
  }
}
