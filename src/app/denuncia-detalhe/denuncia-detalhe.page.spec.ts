import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DenunciaDetalhePage } from './denuncia-detalhe.page';

describe('DenunciaDetalhePage', () => {
  let component: DenunciaDetalhePage;
  let fixture: ComponentFixture<DenunciaDetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciaDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
