import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Results } from './results';
import { RESULTS_DATA } from './results-data';
import { ResultImage } from './results-model';

describe('Results', () => {
  let component: Results;
  let fixture: ComponentFixture<Results>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Results]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Results);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with images data', () => {
    expect(component.images).toBeDefined();
    expect(component.images.length).toBeGreaterThan(0);
    expect(component.images).toEqual(RESULTS_DATA);
  });

  it('should initialize currentIndex as 0', () => {
    expect(component.currentIndex).toBe(0);
  });

  it('should return current image when currentImage getter is called', () => {
    expect(component.currentImage).toEqual(component.images[0]);
  });

  it('should advance to next image when nextImage is called', () => {
    const initialIndex = component.currentIndex;
    component.nextImage();

    expect(component.currentIndex).toBe((initialIndex + 1) % component.images.length);
  });

  it('should wrap to first image when nextImage is called on last image', () => {
    component.currentIndex = component.images.length - 1;
    component.nextImage();

    expect(component.currentIndex).toBe(0);
  });

  it('should go to previous image when prevImage is called', () => {
    component.currentIndex = 1;
    component.prevImage();

    expect(component.currentIndex).toBe(0);
  });

  it('should wrap to last image when prevImage is called on first image', () => {
    component.currentIndex = 0;
    component.prevImage();

    expect(component.currentIndex).toBe(component.images.length - 1);
  });

  it('should update currentImage when currentIndex changes', () => {
    const secondImage = component.images[1];
    component.currentIndex = 1;

    expect(component.currentImage).toEqual(secondImage);
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Resultados Reais');
  });

  it('should render image container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const imageContainer = compiled.querySelector('.image-container');
    expect(imageContainer).toBeTruthy();
  });

  it('should render current image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const image = compiled.querySelector('.image-wrapper img');
    expect(image).toBeTruthy();
    expect(image?.getAttribute('src')).toBe(component.currentImage.src);
    expect(image?.getAttribute('alt')).toBe(component.currentImage.alt);
  });

  it('should render navigation arrows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const prevArrow = compiled.querySelector('.nav-arrow-left');
    const nextArrow = compiled.querySelector('.nav-arrow-right');
    
    expect(prevArrow).toBeTruthy();
    expect(nextArrow).toBeTruthy();
  });

  it('should update displayed image when nextImage is called', () => {
    const initialImageSrc = component.currentImage.src;
    const initialIndex = component.currentIndex;
    
    component.nextImage();
    expect(component.currentIndex).toBe((initialIndex + 1) % component.images.length);
    
    fixture.changeDetectorRef.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const image = compiled.querySelector('.image-wrapper img');
    expect(image?.getAttribute('src')).toBe(component.currentImage.src);
    if (component.images.length > 1) {
      expect(image?.getAttribute('src')).not.toBe(initialImageSrc);
    }
  });

  it('should update displayed image when prevImage is called', () => {
    if (component.images.length > 1) {
      // Set initial state before first detectChanges
      component.currentIndex = 1;
      fixture.changeDetectorRef.detectChanges();
      
      const currentImageSrc = component.currentImage.src;
      component.prevImage();
      fixture.changeDetectorRef.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const image = compiled.querySelector('.image-wrapper img');
      expect(image?.getAttribute('src')).toBe(component.currentImage.src);
      expect(image?.getAttribute('src')).not.toBe(currentImageSrc);
    }
  });
});
