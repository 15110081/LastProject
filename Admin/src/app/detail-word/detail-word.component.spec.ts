import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWordComponent } from './detail-word.component';

describe('DetailWordComponent', () => {
  let component: DetailWordComponent;
  let fixture: ComponentFixture<DetailWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
