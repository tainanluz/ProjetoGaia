import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../model/ItemCarrinho';
import { Produtos } from '../model/Produtos';

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
    this.carrinho=this.getAllCarrinho() ? this.getAllCarrinho() : [];

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

  removerItem(itemCarrinho: ItemCarrinho): void {
    let i = 0;
    this.carrinho=this.getAllCarrinho();
    if(itemCarrinho.quantidade>1){
    this.carrinho.forEach(item => {
      if (item.produtos.idProduto === itemCarrinho.produtos.idProduto) {
        console.log(item);
        this.carrinho[i].quantidade--;
        localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
        return;
      }
      i++;
    });
    return ;
  }
  this.removerAll(itemCarrinho.produtos);
  return ;
  }

  getAllCarrinho(): ItemCarrinho[] {
    return JSON.parse(localStorage.getItem('carrinho') || '{}');
  }


  removerAll(produtos: Produtos):void{
    let auxCarrinho:ItemCarrinho[] = [];
    auxCarrinho=this.getAllCarrinho();
    this.carrinho=[];
    auxCarrinho.forEach(item =>{
      if(item.produtos.idProduto!==produtos.idProduto)
      {
        this.carrinho.push(item);
      }
    });
    localStorage.setItem('carrinho',JSON.stringify(this.carrinho));
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