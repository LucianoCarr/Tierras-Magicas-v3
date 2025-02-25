import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyButtonComponent } from './sky-button.component';

describe('SkyButtonComponent', () => {
  let component: SkyButtonComponent;
  let fixture: ComponentFixture<SkyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkyButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
