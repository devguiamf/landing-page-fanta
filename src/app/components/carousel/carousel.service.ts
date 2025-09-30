import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class CarouselService{
    // Valor inicial do BehaviorSubject
  private carouselIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Observable público para os componentes se inscreverem
  public currentCarousel: Observable<number> = this.carouselIndex.asObservable();

  constructor() { }

  // Método para atualizar o valor do BehaviorSubject
  changeCarousel(change: number): void {
    console.log('changeCarousel',change);
    
    this.carouselIndex.next(change);
  }
}