import { Component, Input } from '@angular/core';

import { Card, Result } from 'src/app/models/blackjackModels';
import { BlackjackService } from 'src/app/services/blackjack.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  @Input() cardsPlayer: Card[];
  @Input() showCardsBankir: Card[];
  @Input() scoreboardStatus: boolean;
  @Input() result: Result;
}
