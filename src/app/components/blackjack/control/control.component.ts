import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Card } from 'src/app/models/blackjackModels';
import { BlackjackService } from 'src/app/services/blackjack.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
})
export class ControlComponent {
  @Output() shuffledDeck: EventEmitter<Card[]> = new EventEmitter<Card[]>();
  @Output() takeCardActivation: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() refuseTakeCardActivation: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() shuffleStatus: boolean;
  @Input() takeStatus: boolean;
  @Input() passStatus: boolean;

  public constructor(public blackjackServis: BlackjackService) {}

  public shuffleCards(): void {
    let workingDeck: Array<Card> = JSON.parse(
      this.blackjackServis.originalDeck
    ).sort(() => Math.random() - 0.5);

    this.shuffledDeck.emit(workingDeck);
  }

  public takeCard(): void {
    this.takeCardActivation.emit(true);
  }

  public refuseTakeCard(): void {
    this.refuseTakeCardActivation.emit(true);
  }
}
