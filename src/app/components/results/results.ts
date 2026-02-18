import { Component } from '@angular/core';
import { ResultImage } from './results-model';
import { RESULTS_DATA } from './results-data';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  images: ResultImage[] = RESULTS_DATA;
  currentIndex: number = 0;

  get currentImage(): ResultImage {
    return this.images[this.currentIndex];
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
