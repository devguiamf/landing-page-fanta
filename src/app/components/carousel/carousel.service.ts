import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CarouselService {
  // Valor inicial do BehaviorSubject
  private carouselcurrentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Observable público para os componentes se inscreverem
  public currentCarousel: Observable<number> = this.carouselcurrentIndex.asObservable();

  constructor() { }

  // Método para atualizar o valor do BehaviorSubject
  changeCarousel(change: number): void {
    console.log('changeCarousel', change);

    this.carouselcurrentIndex.next(change);
  }

  getTextByCarouselIndex(index: number) {
    if (index == 0) {
      return {
        title: "Fanta Laranja",
        description: "Um clássico que nunca sai de moda! Com seu sabor cítrico intenso e refrescante, Fanta Laranja desperta os sentidos e traz aquela sensação de energia e alegria em cada gole. Perfeita para acompanhar momentos de diversão ou simplesmente se refrescar ao longo do dia."
      }
    }

    else if (index == 1) {
      return {
        title: "Fanta Uva",
        description: "Doce, suculenta e irresistível! Fanta Uva combina a intensidade da fruta com a leveza de um refrigerante gaseificado, criando uma experiência frutada que encanta desde o primeiro gole. Ideal para quem adora sabor marcante e refrescante ao mesmo tempo."
      }
    }

    else if (index == 2) {
      return {
        title: "Fanta Guárana",
        description: "O sabor que é a cara do Brasil! Fanta Guaraná traz a energia da fruta amazônica em uma bebida leve, gaseificada e super refrescante. Perfeita para momentos de descontração, encontros com amigos ou simplesmente para se sentir renovado."
      }
    }

    else {
      return {
        title: "Fanta Morango",
        description: "Doçura, frescor e diversão em uma só bebida! Fanta Morango combina o sabor natural da fruta com a leveza do refrigerante, criando uma experiência frutada e irresistível. Cada gole é uma explosão de sabor que transforma qualquer momento em algo especial."
      }
    }
  }
}