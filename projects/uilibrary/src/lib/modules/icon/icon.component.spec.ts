import { MockBuilder, MockRender } from 'ng-mocks';

import { IconComponent } from './icon.component';
import { IconModule } from './icon.module';

describe('IconComponent', () => {
  beforeEach(() => MockBuilder(IconComponent, IconModule)
    .provide(IconModule.forStandalone()));

  it('should create', () => {
    expect(MockRender(IconComponent, { customDimensions: [0, 0] }).point.componentInstance).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept name input', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { name: 'home', customDimensions: [0, 0] }).point;
      expect(comp.name).toBe('home');
    });

    it('should accept size input', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'large', customDimensions: [0, 0] }).point;
      expect(comp.size).toBe('large');
    });

    it('should accept appearance input', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'primary', customDimensions: [0, 0] }).point;
      expect(comp.appearance).toBe('primary');
    });
  });

  describe('Size Configuration', () => {
    it('should set small size dimensions', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'small', customDimensions: [0, 0] }).point;
      expect(comp.width).toBe(30);
      expect(comp.height).toBe(30);
    });

    it('should set medium size dimensions', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'medium', customDimensions: [0, 0] }).point;
      expect(comp.width).toBe(40);
      expect(comp.height).toBe(40);
    });

    it('should set large size dimensions', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'large', customDimensions: [0, 0] }).point;
      expect(comp.width).toBe(80);
      expect(comp.height).toBe(80);
    });

    it('should default to medium size when size is undefined', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: undefined, customDimensions: [0, 0] }).point;
      expect(comp.width).toBe(40);
      expect(comp.height).toBe(40);
    });

    it('should default to medium size when size is invalid', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'invalid-size', customDimensions: [0, 0] }).point;
      expect(comp.width).toBe(40);
      expect(comp.height).toBe(40);
    });
  });

  describe('Appearance Configuration', () => {
    it('should set primary appearance color', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'primary', customDimensions: [0, 0] }).point;
      expect(comp.fillColor).toBe('var(--primary)');
    });

    it('should set secondary appearance color', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'secondary', customDimensions: [0, 0] }).point;
      expect(comp.fillColor).toBe('var(--secondary)');
    });

    it('should set tertiary appearance color', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'tertiary', customDimensions: [0, 0] }).point;
      expect(comp.fillColor).toBe('var(--tertiary)');
    });

    it('should set light-gray appearance color', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'light-gray', customDimensions: [0, 0] }).point;
      expect(comp.fillColor).toBe('var(--light-gray)');
    });

    it('should set dark-gray appearance color', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'dark-gray', customDimensions: [0, 0] }).point;
      expect(comp.fillColor).toBe('var(--dark-gray)');
    });

    it('should set custom appearance color to currentColor', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'custom', customDimensions: [0, 0] }).point;
      expect(comp.fillColor).toBe('currentColor');
    });

    it('should default to secondary appearance when appearance is undefined', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { appearance: undefined, customDimensions: [0, 0] }).point;
      expect(comp.fillColor).toBe('var(--secondary)');
    });

    it('should default to secondary appearance when appearance is invalid', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'invalid-appearance', customDimensions: [0, 0] }).point;
      expect(comp.fillColor).toBe('var(--secondary)');
    });
  });

  describe('Custom Dimensions', () => {
    it('should reflect customDimensions [0, 0] when provided', () => {
      expect(MockRender(IconComponent, { customDimensions: [0, 0] }).point.componentInstance.customDimensions).toEqual([0, 0]);
    });

    it('should override height and width when both values are non-zero', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { customDimensions: [24, 36] }).point;
      expect(comp.height).toBe(24);
      expect(comp.width).toBe(36);
    });

    it('should not override dimensions when customDimensions is [0, 0]', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'small', customDimensions: [0, 0] }).point;
      expect(comp.height).toBe(30);
      expect(comp.width).toBe(30);
    });

    it('should not override dimensions when only height is non-zero', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'small', customDimensions: [24, 0] }).point;
      expect(comp.height).toBe(30);
      expect(comp.width).toBe(30);
    });

    it('should not override dimensions when only width is non-zero', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'small', customDimensions: [0, 36] }).point;
      expect(comp.height).toBe(30);
      expect(comp.width).toBe(30);
    });

    it('should override size-based dimensions when customDimensions are both non-zero', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'large', customDimensions: [24, 36] }).point;
      expect(comp.height).toBe(24);
      expect(comp.width).toBe(36);
    });
  });

  describe('ngOnInit', () => {
    it('should initialize both size and appearance', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { size: 'large', appearance: 'primary', customDimensions: [0, 0] }).point;
      expect(comp.width).toBe(80);
      expect(comp.height).toBe(80);
      expect(comp.fillColor).toBe('var(--primary)');
    });

    it('should initialize with defaults of 40 when no size/appearance inputs provided', () => {
      const { componentInstance: comp } = MockRender(IconComponent, { customDimensions: [0, 0] }).point;
      expect(comp.width).toBe(40);
      expect(comp.height).toBe(40);
      expect(comp.fillColor).toBe('var(--secondary)');
    });
  });
});
