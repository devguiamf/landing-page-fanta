import { Component, inject } from "@angular/core";
import { CarouselService } from "../carousel.service";

@Component({
    selector: 'app-latinha',
    template: `
        <p class="text-center">Carrousel {{currentIndexCarousel}}</p>
    `
})
export class LatinhaComponent {
    private carouselService = inject(CarouselService);
    protected currentIndexCarousel: number = 0;

    constructor(){
        this.carouselService.currentCarousel.subscribe({
            next: (value: number) => {
                this.currentIndexCarousel = value;
            }
        })
    }
}