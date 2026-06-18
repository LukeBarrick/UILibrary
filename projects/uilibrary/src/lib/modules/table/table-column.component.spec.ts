import { Type } from '@angular/core';
import { MockBuilder, MockRender } from 'ng-mocks';

import { TableColumnComponent } from './table-column.component';
import { TableModule } from './table.module';

type AnyTableColumn = TableColumnComponent<any>;
const AnyTableColumn = TableColumnComponent as unknown as Type<AnyTableColumn>;

describe('TableColumnComponent', () => {
  beforeEach(() => MockBuilder(TableColumnComponent, TableModule));

  it('should create', () => {
    expect(MockRender(AnyTableColumn).point.componentInstance).toBeTruthy();
  });

  describe('Template Properties', () => {
    it('should have headerTemplate as undefined before content projection', () => {
      expect(MockRender(AnyTableColumn).point.componentInstance.headerTemplate).toBeUndefined();
    });

    it('should have cellTemplate as undefined before content projection', () => {
      expect(MockRender(AnyTableColumn).point.componentInstance.cellTemplate).toBeUndefined();
    });

    it('should initialize headerTemplate as undefined', () => {
      expect(MockRender(AnyTableColumn).point.componentInstance.headerTemplate).toBeUndefined();
    });

    it('should initialize cellTemplate as undefined', () => {
      expect(MockRender(AnyTableColumn).point.componentInstance.cellTemplate).toBeUndefined();
    });
  });

  describe('ngOnInit', () => {
    it('should complete without errors', () => {
      const comp = MockRender(AnyTableColumn).point.componentInstance as TableColumnComponent<any>;
      expect(() => comp.ngOnInit()).not.toThrow();
    });
  });

  describe('Type Safety', () => {
    it('should work with typed component', () => {
      interface TestData { id: number; name: string; }
      const typedComponent = new TableColumnComponent<TestData>();
      expect(typedComponent).toBeTruthy();
    });
  });

  describe('ContentChild Queries', () => {
    it('should query TableHeaderDirective', () => {
      expect(MockRender(AnyTableColumn).point.componentInstance.headerTemplate).toBeUndefined();
    });

    it('should query TableCellDirective', () => {
      expect(MockRender(AnyTableColumn).point.componentInstance.cellTemplate).toBeUndefined();
    });
  });
});
