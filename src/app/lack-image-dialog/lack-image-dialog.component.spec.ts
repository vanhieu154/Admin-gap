import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LackImageDialogComponent } from './lack-image-dialog.component';

describe('LackImageDialogComponent', () => {
  let component: LackImageDialogComponent;
  let fixture: ComponentFixture<LackImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LackImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LackImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
