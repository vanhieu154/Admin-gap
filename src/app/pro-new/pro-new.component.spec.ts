import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProNewComponent } from './pro-new.component';

describe('ProNewComponent', () => {
  let component: ProNewComponent;
  let fixture: ComponentFixture<ProNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
