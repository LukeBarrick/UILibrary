import { MockBuilder, MockRender } from 'ng-mocks';

import { ButtonComponent } from './button.component';
import { ButtonModule } from '../button.module';

describe('ButtonComponent', () => {
  beforeEach(() => MockBuilder(ButtonComponent, ButtonModule));

  it('should create', () => {
    expect(MockRender(ButtonComponent, { appearance: 'primary' }).point.componentInstance).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept size input', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { size: 'small', appearance: 'primary' }).point;
      expect(comp.size).toBe('small');
    });

    it('should accept appearance input', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: 'primary' }).point;
      expect(comp.appearance).toBe('primary');
    });

    it('should accept disabled input', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { disabled: true }).point;
      expect(comp.disabled).toBe(true);
    });

    it('should accept aria_label input', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { aria_label: 'Test Button' }).point;
      expect(comp.aria_label).toBe('Test Button');
    });

    it('should accept icon input', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { icon: 'home' }).point;
      expect(comp.icon).toBe('home');
    });
  });

  describe('Size Configuration', () => {
    it('should set btn-small class for small size', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { size: 'small', appearance: 'primary' }).point;
      expect(comp.sizeClass).toBe('btn-small');
      expect(comp.iconSizeClass).toBe('small');
    });

    it('should set btn class for non-small sizes', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { size: 'large', appearance: 'primary' }).point;
      expect(comp.sizeClass).toBe('btn');
    });

    it('should default to btn class when size is undefined', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { size: undefined, appearance: 'primary' }).point;
      expect(comp.sizeClass).toBe('btn');
    });
  });

  describe('Appearance Configuration', () => {
    it('should set btn-primary class for primary appearance', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: 'primary' }).point;
      expect(comp.appearanceClass).toBe('btn-primary');
    });

    it('should set btn-secondary class for secondary appearance', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: 'secondary' }).point;
      expect(comp.appearanceClass).toBe('btn-secondary');
    });

    it('should set btn-primary success class for primary-success appearance', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: 'primary-success' }).point;
      expect(comp.appearanceClass).toBe('btn-primary success');
    });

    it('should set btn-primary delete class for primary-delete appearance', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: 'primary-delete' }).point;
      expect(comp.appearanceClass).toBe('btn-primary delete');
    });

    it('should set btn-secondary success class for secondary-success appearance', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: 'secondary-success' }).point;
      expect(comp.appearanceClass).toBe('btn-secondary success');
    });

    it('should set btn-secondary delete class for secondary-delete appearance', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: 'secondary-delete' }).point;
      expect(comp.appearanceClass).toBe('btn-secondary delete');
    });

    it('should default to btn-primary class when appearance is undefined', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: undefined }).point;
      expect(comp.appearanceClass).toBe('btn-primary');
    });

    it('should default to btn-primary class when appearance is invalid', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: 'invalid-appearance' }).point;
      expect(comp.appearanceClass).toBe('btn-primary');
    });
  });

  describe('ngOnInit', () => {
    it('should configure both size and appearance', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { size: 'small', appearance: 'secondary' }).point;
      expect(comp.sizeClass).toBe('btn-small');
      expect(comp.appearanceClass).toBe('btn-secondary');
    });

    it('should initialize with default values when no inputs provided', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: undefined }).point;
      expect(comp.sizeClass).toBe('btn');
      expect(comp.appearanceClass).toBe('btn-primary');
    });
  });

  describe('Icon Integration', () => {
    it('should set small icon size when button is small', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { size: 'small', appearance: 'primary', icon: 'home' }).point;
      expect(comp.iconSizeClass).toBe('small');
    });

    it('should set medium icon size class for large buttons', () => {
      const { componentInstance: comp } = MockRender(ButtonComponent, { size: 'large', appearance: 'primary', icon: 'home' }).point;
      expect(comp.iconSizeClass).toBe('medium');
    });
  });
});

