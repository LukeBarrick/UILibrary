/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, QueryList } from '@angular/core';

import { TableComponent } from './table.component';
import { TableColumnComponent } from './table-column.component';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent, TableColumnComponent ],
      imports: [ CommonModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept data input', () => {
      const testData = [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' }
      ];
      
      component.data = testData;
      expect(component.data).toEqual(testData);
    });

    it('should handle undefined data', () => {
      component.data = undefined;
      expect(component.data).toBeUndefined();
    });

    it('should handle empty data array', () => {
      component.data = [];
      expect(component.data).toEqual([]);
    });

    it('should accept readonly data array', () => {
      const testData: readonly any[] = [
        { id: 1, name: 'Test 1' }
      ];
      
      component.data = testData;
      expect(component.data).toEqual(testData);
    });
  });

  describe('ContentChildren', () => {
    it('should query TableColumnComponents', () => {
      expect(component.columns).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    it('should complete without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('debug method', () => {
    it('should log columns to console', () => {
      spyOn(console, 'log');
      
      component.debug();
      
      expect(console.log).toHaveBeenCalledWith(component.columns);
    });
  });

  describe('Type Safety', () => {
    it('should work with typed data', () => {
      interface TestData {
        id: number;
        name: string;
      }
      
      const typedComponent = new TableComponent<TestData>();
      const typedData: readonly TestData[] = [
        { id: 1, name: 'Test' }
      ];
      
      typedComponent.data = typedData;
      expect(typedComponent.data).toEqual(typedData);
    });
  });
});
