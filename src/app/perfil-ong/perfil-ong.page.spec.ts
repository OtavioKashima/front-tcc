import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilOngPage } from './perfil-ong.page';

describe('PerfilOngPage', () => {
  let component: PerfilOngPage;
  let fixture: ComponentFixture<PerfilOngPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilOngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
