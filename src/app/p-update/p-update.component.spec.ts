import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PUpdateComponent } from './p-update.component';

describe('PUpdateComponent', () => {
  let component: PUpdateComponent;
  let fixture: ComponentFixture<PUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
