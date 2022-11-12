import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDialogViewComponent } from './login-dialog-view.component';

describe('LoginDialogViewComponent', () => {
  let component: LoginDialogViewComponent;
  let fixture: ComponentFixture<LoginDialogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDialogViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
