import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit, inject } from "@angular/core";
import { gsap } from 'gsap';
import { SplitText } from "gsap/SplitText";
import { CarouselService } from "../carousel.service";

@Component({
    selector: 'app-text-carousel',
    template: `
            <div class="container px-5 py-3">
                <h1 class="split mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">We invest in the world’s potential</h1>
                <p class="split mb-6 text-lg font-normal text-gray-800 lg:text-xl"> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
        `,
    styles: `
        .split {
            opacity: 0;
            will-change: transform;
        }

        .split * {
            will-change: transform;
        }

    `
})
export class TextCarouselComponent implements OnInit {
    private splitTween!: gsap.core.Tween;
    private splitInstance: SplitText | null = null;
    private carouselService = inject(CarouselService);

    constructor() {
        gsap.registerPlugin(SplitText);
    }

    ngOnInit(): void {
        this.carouselService.currentCarousel.subscribe({
            next: (value: number) => {
                this.resetAndPlayAnimation()
            }
        })
    }

    private setupAnimation(): void {
        if (this.splitInstance) {
            this.splitInstance.revert();
        }

        gsap.set(".split", { opacity: 1 });

        this.splitInstance = SplitText.create(".split", {
            type: "words, lines",
            linesClass: "line",
            mask: "lines"
        });

        this.splitTween = gsap.from(this.splitInstance.lines, {
            duration: 1.6,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out",
            paused: true
        });

        this.splitTween.play(0);
    }

    private resetAndPlayAnimation(): void {
        if (this.splitTween) {
            this.splitTween.restart(true, false);
        } else {
            this.setupAnimation();
        }
    }

    ngOnDestroy(): void {
        if (this.splitInstance) {
            this.splitInstance.revert();
        }
        if (this.splitTween) {
            this.splitTween.kill();
        }
    }
}

