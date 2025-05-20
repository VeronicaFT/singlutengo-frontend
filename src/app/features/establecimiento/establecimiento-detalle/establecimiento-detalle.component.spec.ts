import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientoDetalleComponent } from './establecimiento-detalle.component';

describe('EstablecimientoDetalleComponent', () => {
  let component: EstablecimientoDetalleComponent;
  let fixture: ComponentFixture<EstablecimientoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstablecimientoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablecimientoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
