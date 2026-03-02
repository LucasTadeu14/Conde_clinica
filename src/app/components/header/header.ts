import { Component, signal, effect, HostListener } from '@angular/core';

/**
 * Header com menu hambúrguer
 * - Controla scroll do body quando menu aberto
 * - Fecha ao clicar fora (overlay) ou em link
 * - Acessibilidade (aria)
 */
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  /** Estado do menu mobile: true = aberto, false = fechado */
  readonly menuOpen = signal(false);

  /** Altura do header para scroll offset (rem) */
  private readonly headerHeightRem = 4.375; // 70px em rem

  constructor() {
    // Effect: controla overflow do body quando menu abre/fecha
    effect(() => {
      const open = this.menuOpen();
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /** Toggle do menu hambúrguer */
  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  /** Fecha o menu (ao clicar em link ou overlay) */
  closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Verifica se o menu está aberto */
  isMenuOpen(): boolean {
    return this.menuOpen();
  }

  /**
   * Scroll suave para seção
   * @param sectionId - ID do elemento (home, services, about, results, contact)
   */
  scrollToSection(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeightPx = this.headerHeightRem * 16; // rem para px (1rem = 16px)
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeightPx;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  /** Scroll para o topo da página */
  scrollToTop(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** Fecha menu ao pressionar Escape */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  /** Fecha menu ao redimensionar para desktop (768px+) */
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 48 * 16) {
      this.closeMenu();
    }
  }
}
