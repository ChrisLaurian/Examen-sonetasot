import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCitaComponent } from './gestionar-cita.component';

describe('GestionarCitaComponent', () => {
  let component: GestionarCitaComponent;
  let fixture: ComponentFixture<GestionarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarCitaComponent]
    });
    fixture = TestBed.createComponent(GestionarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
