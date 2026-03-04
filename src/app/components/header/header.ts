import { Component, signal, effect, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  readonly menuOpen = signal(false);

  constructor() {

    effect(() => {
      const open = this.menuOpen();
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  isMenuOpen(): boolean {
    return this.menuOpen();
  }

  scrollToSection(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeMenu();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  scrollToTop(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeMenu();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 48 * 16) {
      this.closeMenu();
    }
  }
}
