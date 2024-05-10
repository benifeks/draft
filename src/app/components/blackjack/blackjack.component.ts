import { Component } from '@angular/core';

import { Card, Result } from 'src/app/models/blackjackModels';
import { BlackjackService } from 'src/app/services/blackjack.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css'],
})
export class BlackjackComponent {
  result: Result = {
    resultPlayer: 0,
    resultGame: 'Идёт игра',
    showResultBankir: '???',
  };
  public shuffleStatus: boolean = true;
  public takeStatus: boolean = false;
  public passStatus: boolean = false;
  public workingDeck: Array<Card> = [];
  public scoreboardStatus: boolean = false;
  public cardsPlayer: Card[] = [{ card: 'fan', value: 0 }];
  public showCardsBankir: Card[] = [{ card: 'fan', value: 0 }];
  public cardsBankir: Card[] = [];
  public resultBankir: number = 0;

  public constructor(public blackjackService: BlackjackService) {}

  public countScores(cards: Card[]): number {
    return cards.reduce(
      (accumulator: number, currentCard: Card) =>
        accumulator + currentCard.value,
      0
    );
  }

  public resetButtons(status: boolean): void {
    if (status) this.shuffleStatus = true;
    this.takeStatus = false;
    this.passStatus = false;
  }

  public updateResults(data: Result): void {
    this.result = data;
  }

  public startTheGame(deck: Card[]): void {
    this.shuffleStatus = false;
    this.takeStatus = true;
    this.workingDeck = deck;
    this.result.resultPlayer = 0;
    this.resultBankir = 0;
    this.cardsPlayer = [];
    this.showCardsBankir = [];
    this.cardsBankir = [];
    this.scoreboardStatus = true;
    this.updateResults({
      resultPlayer: 0,
      resultGame: 'Идёт игра',
      showResultBankir: '0',
    });
  }

  public takeCardPlayer(status: boolean): void {
    this.passStatus = status;
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
      this.resetButtons(true);
      return;
    }
    if (this.result.resultPlayer > 21) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'ПЕРЕБОР!!! Вы проиграли...',
        showResultBankir: `${this.resultBankir}`,
      });
      this.showCardsBankir = this.cardsBankir;
      this.resetButtons(true);
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
      this.resetButtons(true);
      return;
    }

    if (this.resultBankir === 21) {
      this.updateResults({
        resultPlayer: this.result.resultPlayer,
        resultGame: 'ВЫ ПРОИГРАЛИ!!! Bankir - 21 !!!',
        showResultBankir: `${this.resultBankir}`,
      });
      this.showCardsBankir = this.cardsBankir;
      this.resetButtons(true);
      return;
    }
  }

  public launchBankir(): void {
    this.takeCardBankir();
    if (this.resultBankir <= 15) {
      this.launchBankir();
    }
  }

  public pass(status: boolean): void {
    this.resetButtons(status);
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
