import { Component, EventEmitter, Inject, inject, Output } from "@angular/core";
import { CarouselService } from "../../carousel.service";

@Component({
    selector: 'app-buttons-carousel',
    template: `
        <button
                    (click)="prev()"
            aria-label="Slide anterior"
            class="-translate-y-1/2 z-20
                w-12 h-12 rounded-full
                bg-white/10 border border-white/20
                backdrop-blur-md backdrop-saturate-150
                flex items-center justify-center
                shadow-md
                hover:bg-white/20
                cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-white/30
                transition"
            title="Anterior">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6"></path>
            </svg>


        </button>
        <button
                 (click)="next()"

            aria-label="Próximo slide"
            class="-translate-y-1/2 z-20
                w-12 h-12 rounded-full
                bg-white/10 border border-white/20
                backdrop-blur-md backdrop-saturate-150
                flex items-center justify-center
                shadow-md
                hover:bg-white/20
                cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-white/30
                transition"
            title="Próximo">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6"></path>
            </svg>
        </button>
    
    `,
    styles: `
        :host {
            display: flex;
            justify-content: space-between;
        }
    `
})
export class ButtonsCompoenents {
    carouselService = inject(CarouselService);
    private indexCarousel: number = 0;

    next() {
        this.indexCarousel = this.indexCarousel === 3 ? 0 : this.indexCarousel + 1
        this.carouselService.changeCarousel(this.indexCarousel)
    }

    prev() {
        this.indexCarousel = this.indexCarousel === 0 ? 3 : this.indexCarousel - 1
        this.carouselService.changeCarousel(this.indexCarousel)
    }
}