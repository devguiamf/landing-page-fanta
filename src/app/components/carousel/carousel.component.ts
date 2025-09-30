import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges, WritableSignal } from "@angular/core";
import { ButtonsCompoenents } from "./components/buttons.component";
import { TextCarouselComponent } from "./components/text-carousel.component";

@Component({
    template: `
        <div class="grid grid-cols-12 gap-0">
            <div class="col-span-3 text-center bg-blue-500"></div>
            <app-text-carousel class="col-span-5" />
            <div class="col-span-4 text-center bg-red-500"></div>
            <div class="col-span-12 relative mx-auto pb-24">
            <app-buttons-carousel />
        </div>
    `,
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule, ButtonsCompoenents, TextCarouselComponent],
    styles: `:host { display: block }`
})
export class CarouselComponent{}