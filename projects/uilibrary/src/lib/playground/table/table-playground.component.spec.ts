import { TestBed } from '@angular/core/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { TablePlaygroundComponent } from './table-playground.component';
import { PlaygroundModule } from '../playground.module';
import { TableComponent } from '../../modules/table/table.component';
import { TableModule } from '../../modules/table/table.module';

describe('TablePlaygroundComponent', () => {
    beforeEach(() => MockBuilder(TablePlaygroundComponent, PlaygroundModule));

    it('should create', () => {
        const fixture = MockRender(TablePlaygroundComponent);
        expect(fixture.point.componentInstance).toBeTruthy();
    });

    describe('Component initialisation', () => {
        it('tableData should contain 4 rows', () => {
            const { componentInstance: comp } = MockRender(TablePlaygroundComponent).point;
            expect(comp.tableData.length).toBe(4);
        });

        it('every row should have id, name and email properties', () => {
            const { componentInstance: comp } = MockRender(TablePlaygroundComponent).point;
            comp.tableData.forEach(row => {
                expect(row.id).toBeDefined();
                expect(row.name).toBeDefined();
                expect(row.email).toBeDefined();
            });
        });

        it('ids should be sequential numbers starting from 1', () => {
            const { componentInstance: comp } = MockRender(TablePlaygroundComponent).point;
            const ids = comp.tableData.map(r => r.id);
            expect(ids).toEqual([1, 2, 3, 4]);
        });
    });

    describe('Template', () => {
        it('should render a uilibrary-table element', () => {
            MockRender(TablePlaygroundComponent);
            const tables = ngMocks.findAll('uilibrary-table');
            expect(tables.length).toBeGreaterThan(0);
        });

        it('should bind [data] to tableData', () => {
            const fixture = MockRender(TablePlaygroundComponent);
            const comp = fixture.point.componentInstance;
            const table = ngMocks.findAll('uilibrary-table')[0];
            expect(ngMocks.input(table, 'data')).toBe(comp.tableData);
        });

        it('should render 3 uilibrary-table-column elements', () => {
            MockRender(TablePlaygroundComponent);
            const columns = ngMocks.findAll('uilibrary-table-column');
            expect(columns.length).toBe(3);
        });
    });
});

// ─── TableComponent direct API tests ─────────────────────────────────────────
describe('TableComponent', () => {
    beforeEach(() => MockBuilder(TableComponent, TableModule));

    it('should create', () => {
        const comp = TestBed.createComponent(TableComponent).componentInstance;
        expect(comp).toBeTruthy();
    });

    it('data input should default to undefined', () => {
        const comp = TestBed.createComponent(TableComponent).componentInstance;
        expect(comp.data).toBeUndefined();
    });

    it('data input should accept a readonly array', () => {
        const data = [{ id: 1 }, { id: 2 }] as const;
        const comp = MockRender(TableComponent as any, { data }).point.componentInstance as TableComponent<any>;
        expect(comp.data).toBe(data as any);
    });

    it('debug() should not throw', () => {
        const { componentInstance: comp } = MockRender(TableComponent).point;
        expect(() => comp.debug()).not.toThrow();
    });
});
