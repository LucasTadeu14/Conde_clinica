import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to section when scrollToSection is called', () => {
    const sectionId = 'about';
    const mockElement = document.createElement('div');
    mockElement.id = sectionId;
    document.body.appendChild(mockElement);

    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const getBoundingClientRectSpy = vi.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 0,
      bottom: 200,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({})
    });
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true, configurable: true });

    component.scrollToSection(sectionId);

    expect(getBoundingClientRectSpy).toHaveBeenCalled();
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 30,
      behavior: 'smooth'
    });

    document.body.removeChild(mockElement);
    scrollToSpy.mockRestore();
  });

  it('should prevent default event when scrollToSection is called with event', () => {
    const sectionId = 'services';
    const mockElement = document.createElement('div');
    mockElement.id = sectionId;
    document.body.appendChild(mockElement);

    const preventDefaultSpy = vi.fn();
    const mockEvent = {
      preventDefault: preventDefaultSpy
    } as unknown as Event;

    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    vi.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 0,
      bottom: 200,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({})
    });
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true, configurable: true });

    component.scrollToSection(sectionId, mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });

  it('should not scroll if element does not exist', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    component.scrollToSection('non-existent-section');

    expect(scrollToSpy).not.toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it('should render footer logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('.footer-logo');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('src')).toBe('assets/conde.png');
  });

  it('should render tagline', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tagline = compiled.querySelector('.tagline');
    expect(tagline).toBeTruthy();
    expect(tagline?.textContent).toContain('Sua autoestima é nossa prioridade');
  });

  it('should render social media icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialIcons = compiled.querySelectorAll('.social-icon');
    expect(socialIcons.length).toBe(2);
  });

  it('should render Instagram link with correct href', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const instagramLink = compiled.querySelector('a[aria-label="Instagram"]') as HTMLAnchorElement;
    expect(instagramLink).toBeTruthy();
    expect(instagramLink?.getAttribute('href')).toBe('https://www.instagram.com/conde.estetica/');
    expect(instagramLink?.getAttribute('target')).toBe('_blank');
  });

  it('should render WhatsApp link with correct href', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const whatsappLink = compiled.querySelector('a[aria-label="WhatsApp"]') as HTMLAnchorElement;
    expect(whatsappLink).toBeTruthy();
    expect(whatsappLink?.getAttribute('href')).toBe('https://wa.me/5561991728260');
    expect(whatsappLink?.getAttribute('target')).toBe('_blank');
  });

  it('should render section titles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionTitles = compiled.querySelectorAll('.section-title');
    expect(sectionTitles.length).toBe(3);
    expect(sectionTitles[0].textContent?.trim()).toBe('Páginas');
    expect(sectionTitles[1].textContent?.trim()).toBe('Contato');
    expect(sectionTitles[2].textContent?.trim()).toBe('Programação');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.footer-nav a');
    expect(navLinks.length).toBe(4);
    expect(navLinks[0].textContent?.trim()).toBe('Sobre');
    expect(navLinks[1].textContent?.trim()).toBe('Serviços');
    expect(navLinks[2].textContent?.trim()).toBe('Resultados');
    expect(navLinks[3].textContent?.trim()).toBe('Contato');
  });

  it('should render contact information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const contactItems = compiled.querySelectorAll('.contact-item');
    expect(contactItems.length).toBe(3);
    expect(contactItems[0].textContent?.trim()).toBe('0762 232 13');
    expect(contactItems[1].textContent?.trim()).toBe('aestheticlabbrasov@gmail.com');
    expect(contactItems[2].textContent?.trim()).toBe('Str. Carpaţilor 593, Braşov');
  });

  it('should render schedule information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const scheduleItems = compiled.querySelectorAll('.schedule-item');
    expect(scheduleItems.length).toBe(2);
    expect(scheduleItems[0].textContent?.trim()).toBe('L-V: 09:00-19:00');
    expect(scheduleItems[1].textContent?.trim()).toBe('S: 09:00-17:00');
  });

  it('should render copyright text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const copyright = compiled.querySelector('.copyright');
    expect(copyright).toBeTruthy();
    expect(copyright?.textContent?.trim()).toBe('Toate drepturile rezervate © Aesthetic Lab');
  });

  it('should render separator line', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const separator = compiled.querySelector('.separator-line');
    expect(separator).toBeTruthy();
  });
});
