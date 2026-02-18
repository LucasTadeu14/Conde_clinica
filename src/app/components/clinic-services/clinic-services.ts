import { Component } from '@angular/core';
import { Card } from './clinic-services-model';
import { CARDS_DATA } from './clinic-services-data';

@Component({
  selector: 'app-clinic-services',
  standalone: true,
  templateUrl: './clinic-services.html',
  styleUrls: ['./clinic-services.css'],
})
export class ClinicServices {
  cards: Card[] = CARDS_DATA;
  selectedCard: Card | null = null;

  toggleCard(card: Card): void {
    if (this.selectedCard?.id === card.id) {
      this.selectedCard = null;
    } else {
      this.selectedCard = card;
    }
  }

  onCardMouseLeave(card: Card): void {
    if (this.selectedCard?.id === card.id) {
      this.selectedCard = null;
    }
  }
}
