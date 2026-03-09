import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CARDS_DATA } from '../clinic-services/clinic-services-data';
import { Card } from '../clinic-services/clinic-services-model';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css',
})
export class ServiceDetail {
  service: Card | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const numericId = parseInt(id, 10);
        this.service = CARDS_DATA.find((c) => c.id === numericId) ?? null;
      }
    });
  }
}
