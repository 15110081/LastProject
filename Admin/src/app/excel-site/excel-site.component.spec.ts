import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelSiteComponent } from './excel-site.component';

describe('ExcelSiteComponent', () => {
  let component: ExcelSiteComponent;
  let fixture: ComponentFixture<ExcelSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
