import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogbaseComponent } from './dialogbase.component';

describe('DialogbaseComponent', () => {
  let component: DialogbaseComponent;
  let fixture: ComponentFixture<DialogbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogbaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
