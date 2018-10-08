import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasWriteComponent } from './canvas-write.component';

describe('CanvasWriteComponent', () => {
  let component: CanvasWriteComponent;
  let fixture: ComponentFixture<CanvasWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
