import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LackInforDialogComponentComponent } from './lack-infor-dialog-component.component';

describe('LackInforDialogComponentComponent', () => {
  let component: LackInforDialogComponentComponent;
  let fixture: ComponentFixture<LackInforDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LackInforDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LackInforDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
