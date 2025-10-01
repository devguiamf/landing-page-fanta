import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselService } from '../carousel/carousel.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() shakeNavbar: boolean = false;
  private carouselService = inject(CarouselService);
  protected currentIndexCarousel: number = 0;
  protected animateSpinNext: boolean = false;
  protected animateSpinPrev: boolean = false;

  constructor(){
    this.carouselService.currentCarousel.subscribe({
      next: (value: number) => {
        if (value === 0 && this.currentIndexCarousel === 2){
          this.animateSpinNext = true
          return this.currentIndexCarousel = value;
        }

        if (value === 2 && this.currentIndexCarousel === 0){
          this.animateSpinPrev = true;
          return this.currentIndexCarousel = value;
        }

        if(value > this.currentIndexCarousel){
          this.animateSpinNext = true;
          return this.currentIndexCarousel = value;
        }

        else{
          this.animateSpinPrev = true;
          return this.currentIndexCarousel = value;
        }
      }
    })
  }
}
