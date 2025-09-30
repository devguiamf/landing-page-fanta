import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges, WritableSignal } from "@angular/core";
import { ButtonsCompoenents } from "./components/buttons.component";
import { TextCarouselComponent } from "./components/text-carousel.component";
import { ImageContainerComponent } from "./components/image-carousel.component";
import { LatinhaComponent } from "./components/latinha-carousel.component";

@Component({
    template: `
        <div class="grid grid-cols-12 gap-0">
            
            <app-image-container class="col-span-3" />

            <app-text-carousel class="col-span-3" />
            
            <app-latinha class="col-span-6" />

            <app-buttons-carousel class="col-span-12 relative mx-auto pb-24" />
            
        </div>
    `,
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule, ButtonsCompoenents, TextCarouselComponent, ImageContainerComponent, LatinhaComponent],
    styles: `:host { display: block }`
})
export class CarouselComponent{}