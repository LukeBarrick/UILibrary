export type ButtonAppearance = 'primary' | 'secondary' | 'primary-success' | 'primary-delete' | 'secondary-success' | 'secondary-delete';

export abstract class ButtonBase {
  abstract size: string | undefined;

  abstract sizeClass: string | undefined;
  abstract iconSizeClass: string | undefined;

  buildSizeClass() {
    if(this.size === 'small') {
      this.sizeClass = 'btn-small';
      this.iconSizeClass = 'small'
    } else {
      this.sizeClass = 'btn';
      this.iconSizeClass = "medium";
    }
  }

  buildAppearanceClass(appearance: ButtonAppearance) {
    switch(appearance) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'primary-success':
        return 'btn-primary success';
      case 'primary-delete':
        return 'btn-primary delete';
      case 'secondary-success':
          return 'btn-secondary success';
      case 'secondary-delete':
          return 'btn-secondary delete';
      default:
          return 'btn-primary';
    }
  }
}
