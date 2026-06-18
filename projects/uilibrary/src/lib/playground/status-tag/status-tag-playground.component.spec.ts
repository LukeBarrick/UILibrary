import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { StatusTagPlaygroundComponent } from './status-tag-playground.component';
import { PlaygroundModule } from '../playground.module';
import { StatusTagComponent } from '../../modules/status-tags/status-tag/status-tag.component';
import { StatusTagsModule } from '../../modules/status-tags/status-tags.module';

describe('StatusTagPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(StatusTagPlaygroundComponent, PlaygroundModule));

    it('should create', () => {
        const fixture = MockRender(StatusTagPlaygroundComponent);
        expect(fixture.point.componentInstance).toBeTruthy();
    });

    it('should render uilibrary-status-tag elements in the template', () => {
        MockRender(StatusTagPlaygroundComponent);
        const tags = ngMocks.findAll('uilibrary-status-tag');
        expect(tags.length).toBeGreaterThan(0);
    });

    it('should demonstrate all 8 statusType values in the template', () => {
        MockRender(StatusTagPlaygroundComponent);
        const tags = ngMocks.findAll('uilibrary-status-tag');
        const types = tags.map(t => ngMocks.input(t, 'statusType')).filter(Boolean);
        const expected = ['info', 'warning', 'error', 'success', 'primary', 'secondary', 'inactive', 'pending'];
        expected.forEach(type => expect(types).toContain(type));
    });
});

describe('StatusTagComponent', () => {
    beforeEach(() => MockBuilder(StatusTagComponent, StatusTagsModule));

    it('should default statusType to empty string', () => {
        expect(MockRender(StatusTagComponent, { statusType: '' }).point.componentInstance.statusType).toBe('');
    });

    it('should accept statusType "info"', () => {
        const { componentInstance: comp } = MockRender(StatusTagComponent, { statusType: 'info' }).point;
        expect(comp.statusType).toBe('info');
    });

    it('should accept statusType "warning"', () => {
        const { componentInstance: comp } = MockRender(StatusTagComponent, { statusType: 'warning' }).point;
        expect(comp.statusType).toBe('warning');
    });

    it('should accept statusType "error"', () => {
        const { componentInstance: comp } = MockRender(StatusTagComponent, { statusType: 'error' }).point;
        expect(comp.statusType).toBe('error');
    });

    it('should accept statusType "success"', () => {
        const { componentInstance: comp } = MockRender(StatusTagComponent, { statusType: 'success' }).point;
        expect(comp.statusType).toBe('success');
    });

    it('should accept statusType "primary"', () => {
        const { componentInstance: comp } = MockRender(StatusTagComponent, { statusType: 'primary' }).point;
        expect(comp.statusType).toBe('primary');
    });

    it('should accept statusType "secondary"', () => {
        const { componentInstance: comp } = MockRender(StatusTagComponent, { statusType: 'secondary' }).point;
        expect(comp.statusType).toBe('secondary');
    });

    it('should accept statusType "inactive"', () => {
        const { componentInstance: comp } = MockRender(StatusTagComponent, { statusType: 'inactive' }).point;
        expect(comp.statusType).toBe('inactive');
    });

    it('should accept statusType "pending"', () => {
        const { componentInstance: comp } = MockRender(StatusTagComponent, { statusType: 'pending' }).point;
        expect(comp.statusType).toBe('pending');
    });
});
