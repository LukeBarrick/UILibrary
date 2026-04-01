import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { KeyboardNavigationPlaygroundComponent } from './keyboard-navigation-playground.component';
import { PlaygroundModule } from '../playground.module';
import { CellNavDirective } from '../../modules/keyboard-navigation/cell-nav.directive';

describe('KeyboardNavigationPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(KeyboardNavigationPlaygroundComponent, PlaygroundModule));

    it('should create', () => {
        const fixture = MockRender(KeyboardNavigationPlaygroundComponent);
        expect(fixture.point.componentInstance).toBeTruthy();
    });

    describe('Component initialisation', () => {
        it('gridRows should contain 3 rows', () => {
            const { componentInstance: comp } = MockRender(KeyboardNavigationPlaygroundComponent).point;
            expect(comp.gridRows.length).toBe(3);
        });

        it('each row should contain 3 cells', () => {
            const { componentInstance: comp } = MockRender(KeyboardNavigationPlaygroundComponent).point;
            comp.gridRows.forEach(row => expect(row.length).toBe(3));
        });

        it('first row should be ["A1", "A2", "A3"]', () => {
            const { componentInstance: comp } = MockRender(KeyboardNavigationPlaygroundComponent).point;
            expect(comp.gridRows[0]).toEqual(['A1', 'A2', 'A3']);
        });

        it('second row should be ["B1", "B2", "B3"]', () => {
            const { componentInstance: comp } = MockRender(KeyboardNavigationPlaygroundComponent).point;
            expect(comp.gridRows[1]).toEqual(['B1', 'B2', 'B3']);
        });

        it('third row should be ["C1", "C2", "C3"]', () => {
            const { componentInstance: comp } = MockRender(KeyboardNavigationPlaygroundComponent).point;
            expect(comp.gridRows[2]).toEqual(['C1', 'C2', 'C3']);
        });
    });

    describe('Template', () => {
        it('should render 9 elements with the uiCellNav directive applied', () => {
            MockRender(KeyboardNavigationPlaygroundComponent);
            const cells = ngMocks.findAll(CellNavDirective);
            expect(cells.length).toBe(9);
        });

        it('every uiCellNav cell should have a rowIndex input bound', () => {
            MockRender(KeyboardNavigationPlaygroundComponent);
            const cells = ngMocks.findAll(CellNavDirective);
            cells.forEach(cell => {
                expect(ngMocks.input(cell, 'rowIndex')).toBeDefined();
            });
        });

        it('every uiCellNav cell should have a colIndex input bound', () => {
            MockRender(KeyboardNavigationPlaygroundComponent);
            const cells = ngMocks.findAll(CellNavDirective);
            cells.forEach(cell => {
                expect(ngMocks.input(cell, 'colIndex')).toBeDefined();
            });
        });

        it('rowIndex values should cover 0, 1, and 2', () => {
            MockRender(KeyboardNavigationPlaygroundComponent);
            const cells = ngMocks.findAll(CellNavDirective);
            const rowIndices = cells.map(c => ngMocks.input(c, 'rowIndex') as number);
            expect(rowIndices).toContain(0);
            expect(rowIndices).toContain(1);
            expect(rowIndices).toContain(2);
        });

        it('colIndex values should cover 0, 1, and 2', () => {
            MockRender(KeyboardNavigationPlaygroundComponent);
            const cells = ngMocks.findAll(CellNavDirective);
            const colIndices = cells.map(c => ngMocks.input(c, 'colIndex') as number);
            expect(colIndices).toContain(0);
            expect(colIndices).toContain(1);
            expect(colIndices).toContain(2);
        });
    });
});
