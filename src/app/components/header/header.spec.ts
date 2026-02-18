import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to section when scrollToSection is called', () => {
    const sectionId = 'services';
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

  it('should scroll to top when scrollToTop is called', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    component.scrollToTop();

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
    scrollToSpy.mockRestore();
  });

  it('should prevent default event when scrollToTop is called with event', () => {
    const preventDefaultSpy = vi.fn();
    const mockEvent = {
      preventDefault: preventDefaultSpy
    } as unknown as Event;

    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    component.scrollToTop(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should render logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('img.logo');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('src')).toBe('assets/conde.png');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav-link a');
    expect(navLinks.length).toBe(5);
    expect(navLinks[0].textContent?.trim()).toBe('Home');
    expect(navLinks[1].textContent?.trim()).toBe('Serviços');
    expect(navLinks[2].textContent?.trim()).toBe('Sobre nós');
    expect(navLinks[3].textContent?.trim()).toBe('Resultados');
    expect(navLinks[4].textContent?.trim()).toBe('Contato');
  });

  it('should render agendar button with correct link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const agendarButton = compiled.querySelector('.agendar-button') as HTMLAnchorElement;
    expect(agendarButton).toBeTruthy();
    expect(agendarButton?.getAttribute('href')).toBe('https://wa.me/5561991728260');
    expect(agendarButton?.getAttribute('target')).toBe('_blank');
  });
});
