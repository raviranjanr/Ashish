import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserblogsComponent } from './userblogs.component';

describe('UserblogsComponent', () => {
  let component: UserblogsComponent;
  let fixture: ComponentFixture<UserblogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserblogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
