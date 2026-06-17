/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockProvider } from 'ng-mocks';

import { ShowcaseComponent } from './showcase.component';
import { ToastService } from '../core/services/toast.service';

describe('ShowcaseComponent', () => {
  let component: ShowcaseComponent;
  let fixture: ComponentFixture<ShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ MockProvider(ToastService) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
