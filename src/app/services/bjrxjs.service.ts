import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card, Result } from '../models/blackjackModels';

@Injectable()
export class BjrxjsService {
  private linkToDeck: string = 'assets/filesJSON/bjrxjs.json';
  public shuffleStatus: boolean = true;
  public takeStatus: boolean = false;
  public passStatus: boolean = false;
  public scoreboardStatus: boolean = false;
  public workingDeck: Array<Card> = [];
  public cardsPlayer: Card[] = [{ card: 'fan', value: 0 }];
  public cardsBankir: Card[] = [];
  public showCardsBankir: Card[] = [{ card: 'fan', value: 0 }];
  public resultBankir: number = 0;
  public result: Result = {
    resultPlayer: 0,
    resultGame: 'Идёт игра',
    showResultBankir: '???',
  };

  public constructor(private httpClient: HttpClient) {}

  public newDeck$ = new Observable((subscriber) => {
    this.httpClient.get(this.linkToDeck).subscribe((response) => {
      subscriber.next(response);
    });
  });

  public resetButtons(): void {
    this.shuffleStatus = true;
    this.takeStatus = false;
    this.passStatus = false;
  }

  public updateResults(currentResult: Result): void {
    this.result = currentResult;
  }

  public startTheGame(): void {
    this.shuffleStatus = false;
    this.takeStatus = true;
    this.workingDeck = [];
    this.result.resultPlayer = 0;
    this.resultBankir = 0;
    this.cardsPlayer = [];
    this.cardsBankir = [];
    this.showCardsBankir = [];
    this.scoreboardStatus = true;
    this.updateResults({
      resultPlayer: 0,
      resultGame: 'Идёт игра',
      showResultBankir: '0',
    });
  }

  public countScores(cards: Card[]): number {
    return cards.reduce(
      (accumulator: number, currentCard: Card) =>
        accumulator + currentCard.value,
      0
    );
  }

  public takeCard(): void {
    this.passStatus = true;
    this.cardsPlayer.push(this.workingDeck[0]);
    this.workingDeck.shift();
    this.result.resultPlayer = this.countScores(this.cardsPlayer);
    if (this.result.resultPlayer === 21) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'ВЫ ВЫИГРАЛИ',
        showResultBankir: `${this.resultBankir}`,
      });
      this.showCardsBankir = this.cardsBankir;
      this.resetButtons();
      return;
    }
    if (this.result.resultPlayer > 21) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'ПЕРЕБОР!!! Вы проиграли...',
        showResultBankir: `${this.resultBankir}`,
      });
      this.showCardsBankir = this.cardsBankir;
      this.resetButtons();
      return;
    }
    this.result.showResultBankir = '???';
    this.takeCardBankir();

    this.fulfillUnchangeableConditions();
  }

  public takeCardBankir(): void {
    if (this.resultBankir <= 15) {
      this.cardsBankir.push(this.workingDeck[0]);
      this.resultBankir = this.countScores(this.cardsBankir);
      this.showCardsBankir.push({ card: 'shirt', value: 0 });
      this.workingDeck.shift();
    }

    if (this.resultBankir > 15 && this.resultBankir < 21) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'Идёт игра',
        showResultBankir: 'Пас',
      });
    }
  }

  public fulfillUnchangeableConditions(): void {
    if (this.resultBankir > 21) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'ВЫ ВЫИГРАЛИ!!! Bankir - перебор...',
        showResultBankir: `${this.resultBankir}`,
      });
      this.showCardsBankir = this.cardsBankir;
      this.resetButtons();
      return;
    }

    if (this.resultBankir === 21) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'ВЫ ПРОИГРАЛИ!!! Bankir - 21 !!!',
        showResultBankir: `${this.resultBankir}`,
      });
      this.showCardsBankir = this.cardsBankir;
      this.resetButtons();
      return;
    }
  }

  public launchBankir(): void {
    this.takeCardBankir();
    if (this.resultBankir <= 15) {
      this.launchBankir();
    }
  }

  public pass(): void {
    this.resetButtons();
    this.launchBankir();
    this.fulfillUnchangeableConditions();

    if (this.resultBankir === this.result.resultPlayer) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'НИЧЬЯ!!!',
        showResultBankir: `${this.resultBankir}`,
      });
      this.showCardsBankir = this.cardsBankir;
      return;
    }

    if (
      this.resultBankir < 21 &&
      this.resultBankir > this.result.resultPlayer
    ) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'ВЫ ПРОИГРАЛИ!!!',
        showResultBankir: `${this.resultBankir}`,
      });
      this.showCardsBankir = this.cardsBankir;
      return;
    }

    if (
      this.resultBankir < 21 &&
      this.resultBankir < this.result.resultPlayer
    ) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'ВЫ ВЫИГРАЛИ!!!',
        showResultBankir: `${this.resultBankir}`,
      });
      this.showCardsBankir = this.cardsBankir;
      return;
    }
  }
}
