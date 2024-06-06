import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterfaceLibraryComponent } from './user-interface-library.component';

describe('UserInterfaceLibraryComponent', () => {
  let component: UserInterfaceLibraryComponent;
  let fixture: ComponentFixture<UserInterfaceLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInterfaceLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInterfaceLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
