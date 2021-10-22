import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../model/ItemCarrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  carrinho: ItemCarrinho[] = [];
  listaCarrinho: ItemCarrinho[];
  teste: ItemCarrinho;

  constructor() {
  }



  adicionarItem(itemCarrinho: ItemCarrinho): void {
    let isAdd: boolean = false;
    let i = 0;

    this.carrinho.forEach(item => {
      if (item.produtos.idProduto === itemCarrinho.produtos.idProduto) {
        console.log(item);
        this.carrinho[i].quantidade++;
        isAdd = true;
        localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
        return;
      }
      i++;
    });
    if (!isAdd) {
      this.carrinho.push(itemCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    }
  }

  getAllCarrinho(): any {
    return JSON.parse(localStorage.getItem('carrinho') || '{}');
  }

  removerItem(itemCarrinho: ItemCarrinho): void {
    let i = 0;

    this.carrinho.forEach(item => {
      if (item.produtos.idProduto == itemCarrinho.produtos.idProduto) {
        if (this.carrinho[i].quantidade > 1) {
          this.carrinho[i].quantidade--;
          localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
          return;
        }
      }
    })
  }


  // adicionarItem(itemCarrinho: ItemCarrinho): void {
  //   let isAdd: boolean = false;
  //   let i = 0;

  //   this.carrinho.forEach(item => {
  //     if (item.productId === itemCarrinho.productId) {
  //       this.carrinho[i].quantidade++;
  //       isAdd = true;
  //       localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  //       return;
  //     }
  //     i++;
  //   });
  //   if (!isAdd) {
  //     this.carrinho.push(itemCarrinho);
  //     localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  //   }
  // }  

  // removerItem(itemCarrinho: ItemCarrinho): void {
  //   let i = 0;

  //   this.carrinho.forEach(item => {
  //     if (item.productId == itemCarrinho.productId) {
  //       if (this.carrinho[i].quantidade > 1) {
  //         this.carrinho[i].quantidade--;
  //         localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  //         return;
  //       }
  //     }
  //   })
  // }

}