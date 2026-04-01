/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { UUIDService } from '../../core/services/UUID.service';

@Component({
  standalone: false,
  template: `<input ui-input />`
})
class TestHostComponent {}

describe('InputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent, TestHostComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: UUIDService, useValue: { generate: () => 'test-uuid' } }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });
});
