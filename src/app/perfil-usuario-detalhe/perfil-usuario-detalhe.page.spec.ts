import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilUsuarioDetalhePage } from './perfil-usuario-detalhe.page';

describe('PerfilUsuarioDetalhePage', () => {
  let component: PerfilUsuarioDetalhePage;
  let fixture: ComponentFixture<PerfilUsuarioDetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
