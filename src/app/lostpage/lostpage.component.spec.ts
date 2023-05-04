import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostpageComponent } from './lostpage.component';

describe('LostpageComponent', () => {
  let component: LostpageComponent;
  let fixture: ComponentFixture<LostpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
