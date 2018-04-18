import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListquotesComponent } from './listquotes.component';

describe('ListquotesComponent', () => {
  let component: ListquotesComponent;
  let fixture: ComponentFixture<ListquotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListquotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListquotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
