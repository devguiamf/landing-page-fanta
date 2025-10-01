import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { NgClass } from "@angular/common";
import { CarouselService } from "../../components/carousel/carousel.service";


@Component({
    template: `
        <div  class="content flex flex-col gradient-background" [ngClass]="getBgClass()">

            <app-navbar 
                class="pt-10" 
                [shakeNavbar]="shakeNavbar()"
            />

            <app-carousel />

        </div>
    `,
    styles: `
        :host {
            display: block;
  /* ocupa toda a largura */
        }

        .content {
            background-size: 200% 200%;
            background-position: top right;
            transition: background 0.5s ease; // fade rápido caso queira
            overflow: hidden;
            height: 100vh; /* ocupa toda a tela */
            width: 100vw;
        }
    `,
    imports: [NavbarComponent, CarouselComponent, NgClass],
    // providers: [CarouselService]
})
export class HomePage implements OnInit {

    private mapCarousel = new Map<number, string>();
    protected carouselIndex: WritableSignal<number> = signal(0);
    protected shakeNavbar: WritableSignal<boolean> = signal(false);
    private carouselService = inject(CarouselService);

    constructor() {
        this.mapCarousel.set(0, "bg-fanta-laranja")
        this.mapCarousel.set(1, "bg-fanta-uva")
        this.mapCarousel.set(2, "bg-fanta-guarana")
        this.mapCarousel.set(3, "bg-fanta-morango")
    }

    ngOnInit(): void {
        this.carouselService.currentCarousel.subscribe({
            next: (value: number) => {
                this.carouselIndex.set(value);
                this.shakeNavbar.set(true);
                setTimeout(() => this.shakeNavbar.set(false), 500);
            }
        })
    }

    getBgClass() {
        return this.mapCarousel.get(this.carouselIndex())
    }
}