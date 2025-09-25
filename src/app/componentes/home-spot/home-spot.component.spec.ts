import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSpotComponent } from './home-spot.component';

describe('HomeSpotComponent', () => {
  let component: HomeSpotComponent;
  let fixture: ComponentFixture<HomeSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSpotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
