import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FRASES } from '../painel/frases-mock';
import { Frase } from './../shared/frase.model';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public instrucao = 'Traduza a frase:';
  public frases = FRASES;
  public resposta = '';
  public rodada = 0;
  public rodadaFrase: Frase;
  public progresso = 0;
  public tentativas = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.atualizaRodada();
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (resposta.target as HTMLInputElement).value;
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.fraseBR.toLowerCase().trim() === this.resposta.toLowerCase().trim()) {

      this.progresso += (100 / this.frases.length);

      this.rodada++;

      if (this.rodada === this.frases.length) {
        this.encerrarJogo.emit('vitoria');
      }

      this.atualizaRodada();
    } else {
      this.tentativas--;

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota');
      }
    }
  }

}
