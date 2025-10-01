import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonsCompoenents } from "./components/buttons-next-prev/buttons.component";
import { TextCarouselComponent } from "./components/text/text-carousel.component";
import { ImageContainerComponent } from "./components/image/image-carousel.component";
import { LatinhaComponent } from "./components/latinha/latinha-carousel.component";

@Component({
    template: `
        <div class="grid grid-cols-12 gap-0">
            
            <app-image-container class="col-span-4 self-center" />

            <app-text-carousel class="col-span-3 self-center" />
            
            <app-latinha class="col-span-5 pt-10" />

            <app-buttons-carousel class="absolute bottom-10 right-0 left-0 mx-auto w-1/5" />
            
        </div>
    `,
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule, ButtonsCompoenents, TextCarouselComponent, ImageContainerComponent, LatinhaComponent],
    styles: `:host { display: block }`
})
export class CarouselComponent{}