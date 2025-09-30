import { Component, inject } from "@angular/core";
import { CarouselService } from "../carousel.service";

@Component({
    selector: 'app-image-container',
    template: `
        <img [src]="mapCarouselImages.get(currentIndexCarousel)">
    `
})
export class ImageContainerComponent {
    protected currentIndexCarousel: number = 0;
    private carouselService = inject(CarouselService);
    protected mapCarouselImages = new Map<number, string>();

    constructor() {
        this.mapCarouselImages.set(0, "image-1.png");
        this.mapCarouselImages.set(1, "image-2.png");
        this.mapCarouselImages.set(2, "image-3.png");
        this.mapCarouselImages.set(3, "image-4.png");

        this.carouselService.currentCarousel.subscribe({
            next: (value: number) => {
                this.currentIndexCarousel = value;
            }
        })
    }
}