import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProUpdateComponent } from './pro-update.component';

describe('ProUpdateComponent', () => {
  let component: ProUpdateComponent;
  let fixture: ComponentFixture<ProUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
