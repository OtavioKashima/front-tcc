import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector: 'app-codigo-verificacao',
templateUrl: './codigo-verificacao.page.html',
styleUrls: ['./codigo-verificacao.page.scss'],
standalone: false
})
export class CodigoVerificacaoPage {

codigo: string = '';

constructor(private router: Router) {}

goToRecuperar(){
this.router.navigate(['/recuperar-senha']);
}

verificarCodigo(){

if(!this.codigo){
alert('Digite o código!');
return;
}

alert('Código confirmado!');

this.router.navigate(['/nova-senha']);

}

reenviarCodigo(){
alert('Código reenviado para seu email!');
}

}