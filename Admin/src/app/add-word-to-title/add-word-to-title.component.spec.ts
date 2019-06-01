import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWordToTitleComponent } from './add-word-to-title.component';

describe('AddWordToTitleComponent', () => {
  let component: AddWordToTitleComponent;
  let fixture: ComponentFixture<AddWordToTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWordToTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordToTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
