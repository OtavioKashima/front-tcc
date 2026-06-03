import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComunicadoDetalhePage } from './comunicado-detalhe.page';

describe('ComunicadoDetalhePage', () => {
  let component: ComunicadoDetalhePage;
  let fixture: ComponentFixture<ComunicadoDetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicadoDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
