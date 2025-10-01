import { Component, inject } from "@angular/core";
import { CarouselService } from "../../carousel.service";

@Component({
    selector: 'app-latinha',
    template: `
      <div class="carousel-container">
        <ul 
          class="carousel-track" 
          [style.transform]="'translateX(' + getTranslateX() + '%)'">
          @for (item of mapCarouselImages.values(); track $index) {
            <li [class.active]="$index === currentIndexCarousel">
              <img [src]="item" class="latinha-img" />
            </li>
          }
        </ul>
      </div>
    `,
    styleUrls: ['./latinha-carousel.component.scss']
  })
  export class LatinhaComponent {
    private carouselService = inject(CarouselService);
    protected currentIndexCarousel: number = 0;
    protected mapCarouselImages = new Map<number, string>();
  
    constructor() {
      this.mapCarouselImages.set(0, "latas/lata-laranja.png");
      this.mapCarouselImages.set(1, "latas/lata-uva.png");
      this.mapCarouselImages.set(2, "latas/lata-guarana.png");
      this.mapCarouselImages.set(3, "latas/lata-morango.png");
  
      this.carouselService.currentCarousel.subscribe({
        next: (value: number) => {
          this.currentIndexCarousel = value;
        }
      });
    }
  
    getTranslateX(): number {
      // cada item ocupa 100% do container
      return -this.currentIndexCarousel * 100;
    }
  }
