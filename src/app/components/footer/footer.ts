import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  constructor(private router: Router) {}

  scrollOrNavigate(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const url = this.router.url.split('?')[0];
    const isHome = url === '/' || url === '';
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      this.router.navigate(['/'], { fragment: sectionId });
    }
  }
}
