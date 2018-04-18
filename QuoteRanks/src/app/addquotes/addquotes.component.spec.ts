import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquotesComponent } from './addquotes.component';

describe('AddquotesComponent', () => {
  let component: AddquotesComponent;
  let fixture: ComponentFixture<AddquotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddquotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddquotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
