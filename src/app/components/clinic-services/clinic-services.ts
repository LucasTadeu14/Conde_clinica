import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from './clinic-services-model';
import { CARDS_DATA } from './clinic-services-data';

@Component({
  selector: 'app-clinic-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clinic-services.html',
  styleUrls: ['./clinic-services.css'],
})
export class ClinicServices {
  cards: Card[] = CARDS_DATA;
}
