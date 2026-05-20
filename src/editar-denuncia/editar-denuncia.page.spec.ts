import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarDenunciaPage } from './editar-denuncia.page';

describe('EditarDenunciaPage', () => {
  let component: EditarDenunciaPage;
  let fixture: ComponentFixture<EditarDenunciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDenunciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
