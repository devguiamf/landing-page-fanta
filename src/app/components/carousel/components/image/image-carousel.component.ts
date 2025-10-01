import { Component, inject } from "@angular/core";
import { CarouselService } from "../../carousel.service";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-image-container',
    template: `
        <img 
            [src]="mapCarouselImages.get(currentIndexCarousel)" 
            class="relative -left-64"
            [ngClass]="{ 'rotate-animation-next': animateSpinNext, 'rotate-animation-prev': animateSpinPrev}"
            (animationend)="animateSpinNext = false; animateSpinPrev = false"
            >
    `,
    styleUrls: ['./image-carousel.component.scss'],
    imports: [NgClass]
})
export class ImageContainerComponent {
    protected currentIndexCarousel: number = 0;
    private carouselService = inject(CarouselService);
    protected mapCarouselImages = new Map<number, string>();
    protected animateSpinNext: boolean = false;
    protected animateSpinPrev: boolean = false;

    constructor() {
        this.mapCarouselImages.set(0, "frutas/laranjas.png");
        this.mapCarouselImages.set(1, "frutas/uvas.png");
        this.mapCarouselImages.set(2, "frutas/guaranas.png");
        this.mapCarouselImages.set(3, "frutas/morangos.png");

        this.carouselService.currentCarousel.subscribe({
            next: (value: number) => {
                if (value === 0 && this.currentIndexCarousel === 2){
                    this.animateSpinNext = true
                    return this.currentIndexCarousel = value;
                  }
          
                  if (value === 2 && this.currentIndexCarousel === 0){
                    this.animateSpinPrev = true;
                    return this.currentIndexCarousel = value;
                  }
          
                  if(value > this.currentIndexCarousel){
                    this.animateSpinNext = true;
                    return this.currentIndexCarousel = value;
                  }
          
                  else{
                    this.animateSpinPrev = true;
                    return this.currentIndexCarousel = value;
                  }
            }
        })
    }
}