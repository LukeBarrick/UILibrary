import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UilibraryComponent } from './uilibrary.component';

describe('UilibraryComponent', () => {
  let component: UilibraryComponent;
  let fixture: ComponentFixture<UilibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UilibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UilibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
