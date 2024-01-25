import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenpopOBRTOComponent } from './screenpop-obrto.component';

describe('ScreenpopOBRTOComponent', () => {
  let component: ScreenpopOBRTOComponent;
  let fixture: ComponentFixture<ScreenpopOBRTOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenpopOBRTOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenpopOBRTOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
