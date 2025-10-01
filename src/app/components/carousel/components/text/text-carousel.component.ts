import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { gsap } from 'gsap';
import { SplitText } from "gsap/SplitText";
import { CarouselService } from "../../carousel.service";

@Component({
    selector: 'app-text-carousel',
    template: `
            <div class="container px-5 py-3">
                <h1 #titleElement class="split mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">{{ textProps.title }}</h1>
                <p #descElement class="split mb-6 text-lg font-normal text-gray-800 lg:text-xl"> {{ textProps.description }}</p>
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
export class TextCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('titleElement') titleElement!: ElementRef<HTMLElement>;
    @ViewChild('descElement') descElement!: ElementRef<HTMLElement>;
    
    private splitTween!: gsap.core.Tween;
    private splitInstance: SplitText | null = null;
    private carouselService = inject(CarouselService);
    protected textProps: {title: string, description: string} = { title: '', description: '' };
    private isInitialized = false;

    constructor() {
        gsap.registerPlugin(SplitText);
    }

    ngOnInit(): void {
        this.carouselService.currentCarousel.subscribe({
            next: (value: number) => {
                const newText = this.carouselService.getTextByCarouselIndex(value);                
                this.updateText(newText);
            }
        });
    }

    ngAfterViewInit(): void {
        this.isInitialized = true;
        // Anima o conteúdo inicial
        setTimeout(() => this.setupAnimation(), 0);
    }

    private updateText(newText: {title: string, description: string}): void {
        this.textProps = newText;

        if (!this.isInitialized) return;

        // Limpa animações anteriores
        if (this.splitInstance) {
            this.splitInstance.revert();
            this.splitInstance = null;
        }

        if (this.splitTween) {
            this.splitTween.kill();
        }

        // Atualiza o texto diretamente no DOM
        this.titleElement.nativeElement.textContent = newText.title;
        this.descElement.nativeElement.textContent = newText.description;

        // Recria a animação no próximo frame
        this.setupAnimation()
    }

    private setupAnimation(): void {
        const elements = [this.titleElement.nativeElement, this.descElement.nativeElement];
        
        gsap.set(elements, { opacity: 1 });

        this.splitInstance = new SplitText(elements, {
            type: "words, lines",
            linesClass: "line",
            mask: "lines"
        });

        this.splitTween = gsap.from(this.splitInstance.lines, {
            duration: 1.6,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out"
        });
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