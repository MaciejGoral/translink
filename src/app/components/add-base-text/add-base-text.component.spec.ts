import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseTextComponent } from './add-base-text.component';

describe('AddBaseTextComponent', () => {
  let component: AddBaseTextComponent;
  let fixture: ComponentFixture<AddBaseTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBaseTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBaseTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
