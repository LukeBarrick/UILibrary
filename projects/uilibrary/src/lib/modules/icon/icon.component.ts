import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
    selector: 'uilibrary-icon',
    templateUrl: './icon.component.html',
    standalone: true,
    imports: [SvgIconComponent]
})
export class IconComponent implements OnInit, OnChanges {
  @Input() name: string | undefined;
  @Input() size: string | undefined;
  @Input() appearance: string | undefined;

  //Provide a custom set of dimensions
  //Used within internal components which icons dimensions do not match any of the constrained options.
  @Input() customDimensions: [height: number, width: number] = [0,0];

  width: number | undefined;
  height: number | undefined;
  fillColor: string = '';

  ngOnInit() {
    this.buildSize();
    this.buildColour();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const size = changes['size'],
      appearance = changes['appearance'];

    if (size && size.currentValue !== size.previousValue) {
      this.buildSize();
    }

    if (appearance && appearance.currentValue !== appearance.previousValue) {
      this.buildColour();
    }
  }

  private buildSize() {
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
  }

  private buildColour() {
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
