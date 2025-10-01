import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { NgClass } from "@angular/common";
import { CarouselService } from "../../components/carousel/carousel.service";


@Component({
    template: `
    <div class="content flex flex-col gradient-background"
        [ngClass]="[getBgClass(), animating() ? 'transitioning' : '']">
        <app-navbar class="pt-10" [shakeNavbar]="shakeNavbar()" />
        <app-carousel />
    </div>
    `,
    styleUrl: "./home.page.scss",
    imports: [NavbarComponent, CarouselComponent, NgClass],
    // providers: [CarouselService]
})
export class HomePage implements OnInit {
    private mapCarousel = new Map<number, string>();
    protected carouselIndex: WritableSignal<number> = signal(0);
    protected shakeNavbar: WritableSignal<boolean> = signal(false);
    protected animating: WritableSignal<boolean> = signal(false); // NOVO
    private transitioning!: string;
    private carouselService = inject(CarouselService);

    constructor() {
        this.mapCarousel.set(0, "bg-primeiro")
        this.mapCarousel.set(1, "bg-segundo")
        this.mapCarousel.set(2, "bg-terceiro")
        this.mapCarousel.set(3, "bg-quarto")
    }

    ngOnInit(): void {
        this.carouselService.currentCarousel.subscribe({
            next: (value: number) => {
                this.animating.set(true); // NOVO
                this.carouselIndex.set(value);
                this.shakeNavbar.set(true);

                setTimeout(() => {
                    this.shakeNavbar.set(false);
                    this.animating.set(false); // NOVO
                }, 1500); // tempo da animação
            }
        })
    }

    getBgClass() {
        return this.mapCarousel.get(this.carouselIndex())
    }
}