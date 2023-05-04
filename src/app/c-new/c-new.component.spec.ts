import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNewComponent } from './c-new.component';

describe('CNewComponent', () => {
  let component: CNewComponent;
  let fixture: ComponentFixture<CNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
