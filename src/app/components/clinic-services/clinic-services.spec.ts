import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClinicServices } from './clinic-services';
import { Card } from './clinic-services-model';
import { CARDS_DATA } from './clinic-services-data';

describe('ClinicServices', () => {
  let component: ClinicServices;
  let fixture: ComponentFixture<ClinicServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with cards data', () => {
    expect(component.cards).toBeDefined();
    expect(component.cards.length).toBeGreaterThan(0);
    expect(component.cards).toEqual(CARDS_DATA);
  });

  it('should initialize selectedCard as null', () => {
    expect(component.selectedCard).toBeNull();
  });

  it('should toggle card selection when toggleCard is called', () => {
    const testCard: Card = component.cards[0];

    component.toggleCard(testCard);
    expect(component.selectedCard).toEqual(testCard);

    component.toggleCard(testCard);
    expect(component.selectedCard).toBeNull();
  });

  it('should select different card when toggleCard is called with different card', () => {
    const firstCard: Card = component.cards[0];
    const secondCard: Card = component.cards[1];

    component.toggleCard(firstCard);
    expect(component.selectedCard).toEqual(firstCard);

    component.toggleCard(secondCard);
    expect(component.selectedCard).toEqual(secondCard);
  });

  it('should deselect card when toggleCard is called with same card', () => {
    const testCard: Card = component.cards[0];

    component.selectedCard = testCard;
    component.toggleCard(testCard);

    expect(component.selectedCard).toBeNull();
  });

  it('should deselect card when onCardMouseLeave is called with selected card', () => {
    const testCard: Card = component.cards[0];
    component.selectedCard = testCard;

    component.onCardMouseLeave(testCard);

    expect(component.selectedCard).toBeNull();
  });

  it('should not change selectedCard when onCardMouseLeave is called with different card', () => {
    const firstCard: Card = component.cards[0];
    const secondCard: Card = component.cards[1];
    component.selectedCard = firstCard;

    component.onCardMouseLeave(secondCard);

    expect(component.selectedCard).toEqual(firstCard);
  });

  it('should render cards in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.card');
    expect(cards.length).toBe(component.cards.length);
  });

  it('should display card images', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardImages = compiled.querySelectorAll('.card img');
    expect(cardImages.length).toBe(component.cards.length);
  });

  it('should show overlay when card is selected', () => {
    const testCard: Card = component.cards[0];
    component.toggleCard(testCard);
    fixture.changeDetectorRef.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const overlay = compiled.querySelector('.card-overlay');
    expect(overlay).toBeTruthy();
  });

  it('should hide overlay when card is not selected', () => {
    component.selectedCard = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const overlays = compiled.querySelectorAll('.card-overlay');
    expect(overlays.length).toBe(0);
  });

  it('should display card description in overlay when selected', () => {
    const testCard: Card = component.cards[0];
    component.toggleCard(testCard);
    fixture.changeDetectorRef.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const overlayDescription = compiled.querySelector('.card-overlay-description');
    expect(overlayDescription).toBeTruthy();
    expect(overlayDescription?.textContent?.trim()).toBe(testCard.description);
  });
});
