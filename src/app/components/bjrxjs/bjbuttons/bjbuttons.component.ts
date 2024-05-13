import { Component } from '@angular/core';

import { BjrxjsService } from 'src/app/services/bjrxjs.service';

@Component({
  selector: 'app-bjbuttons',
  templateUrl: './bjbuttons.component.html',
  styleUrls: ['./bjbuttons.component.css'],
})
export class BjbuttonsComponent {
  public constructor(public bjrxjsServise: BjrxjsService) {}
  public shuffledDeck(): void {
    this.bjrxjsServise.startTheGame();
    this.bjrxjsServise.newDeck$.subscribe((deck: any) => {
      deck.sort(() => Math.random() - 0.5);
      this.bjrxjsServise.workingDeck = deck;
    });
  }
}
