import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNewComponent } from './p-new.component';

describe('PNewComponent', () => {
  let component: PNewComponent;
  let fixture: ComponentFixture<PNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
