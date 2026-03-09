import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../components/hero/hero';
import { ClinicServices } from '../../components/clinic-services/clinic-services';
import { About } from '../../components/about/about';
import { Results } from '../../components/results/results';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, ClinicServices, About, Results],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }
}
