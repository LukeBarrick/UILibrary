import { Type } from '@angular/core';
import { MockBuilder, MockRender } from 'ng-mocks';

import { TableComponent } from './table.component';
import { TableModule } from './table.module';

type AnyTable = TableComponent<any>;
const AnyTable = TableComponent as unknown as Type<AnyTable>;

describe('TableComponent', () => {
  beforeEach(() => MockBuilder(TableComponent, TableModule));

  it('should create', () => {
    expect(MockRender(AnyTable).point.componentInstance).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept data input', () => {
      const testData = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];
      const comp = MockRender(AnyTable, { data: testData }).point.componentInstance as TableComponent<any>;
      expect(comp.data).toEqual(testData);
    });

    it('should handle undefined data', () => {
      const comp = MockRender(AnyTable, { data: undefined }).point.componentInstance as TableComponent<any>;
      expect(comp.data).toBeUndefined();
    });

    it('should handle empty data array', () => {
      const comp = MockRender(AnyTable, { data: [] }).point.componentInstance as TableComponent<any>;
      expect(comp.data).toEqual([]);
    });

    it('should accept readonly data array', () => {
      const testData: readonly any[] = [{ id: 1, name: 'Test 1' }];
      const comp = MockRender(AnyTable, { data: testData }).point.componentInstance as TableComponent<any>;
      expect(comp.data).toEqual(testData);
    });
  });

  describe('ContentChildren', () => {
    it('should query TableColumnComponents', () => {
      expect(MockRender(AnyTable).point.componentInstance.columns).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    it('should complete without errors', () => {
      const comp = MockRender(AnyTable).point.componentInstance as TableComponent<any>;
      expect(() => comp.ngOnInit()).not.toThrow();
    });
  });

  describe('debug method', () => {
    it('should log columns to console', () => {
      const comp = MockRender(AnyTable).point.componentInstance as TableComponent<any>;
      spyOn(console, 'log');
      comp.debug();
      expect(console.log).toHaveBeenCalledWith(comp.columns);
    });
  });

  describe('Type Safety', () => {
    it('should work with typed data', () => {
      interface TestData { id: number; name: string; }
      const typedComponent = new TableComponent<TestData>();
      const typedData: readonly TestData[] = [{ id: 1, name: 'Test' }];
      typedComponent.data = typedData;
      expect(typedComponent.data).toEqual(typedData);
    });
  });
});
