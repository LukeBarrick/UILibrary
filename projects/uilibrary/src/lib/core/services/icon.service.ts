import { Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { IconConstants } from '../constants/icon.constants';

@Injectable({
  providedIn: 'root'
})
export class LibIconService {

  constructor(private iconReg: SvgIconRegistryService) { }

  registerIcon(iconName: string) {
    this.iconReg.loadSvg(`./assets/images/${iconName}.svg`, iconName)?.subscribe();
  }

  registerIcons(): Promise<any> {
    return new Promise((resolve, reject) => {
      const icons = Object.keys(IconConstants).map((key) => (IconConstants as any)[key]);
      icons.forEach((icon) => {
        if (icon) {
          this.registerIcon(icon);
        }
      });

      resolve(undefined);
    })
  }
}
