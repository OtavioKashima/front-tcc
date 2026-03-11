import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdocaoDetalhePage } from './adocao-detalhe.page';

describe('AdocaoDetalhePage', () => {
  let component: AdocaoDetalhePage;
  let fixture: ComponentFixture<AdocaoDetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdocaoDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
