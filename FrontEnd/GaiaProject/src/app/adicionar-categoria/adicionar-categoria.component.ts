import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categorias } from '../model/Categorias';
import { Produtos } from '../model/Produtos';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriasService } from '../service/categorias.service';
import { ProdutosService } from '../service/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adicionar-categoria',
  templateUrl: './adicionar-categoria.component.html',
  styleUrls: ['./adicionar-categoria.component.css']
})
export class AdicionarCategoriaComponent implements OnInit {
  listaProdutos: Produtos[]
  listaCategorias: Categorias[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()
  isLogged = false;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriasService,
    private produtoService: ProdutosService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') == '') {
      this.router.navigate(['/loginv2'])                                          
    }
    this.isLogged = this.authService.isLogged();
    this.findAllCategorias()
    this.findAllProduto()
  }


  findAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categorias[]) => {
      this.listaCategorias = resp
    })
  }


  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categorias) => {
      this.categorias = resp
    })
  }


  findAllProduto() {
    this.produtoService.getAllProduto().subscribe((resp: Produtos[]) => {
      this.listaProdutos = resp
    })
  }

  AdicionarCategoria() {
    this.produtos.idProduto = this.idProduto
    this.usuario.idUsuario = environment.idUsuario
    this.categorias.usuario = this.usuario
    console.log("produto " + JSON.stringify(this.categorias))
    this.categoriaService.postCategoria(this.categorias).subscribe((resp: Categorias) => {
      this.categorias = resp
      // this.router.navigate(['/home'])
      // alert('Categoria adicionada com sucesso')
    })
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Categoria adicionada com sucesso'
    })
  }

  AdicionarProduto() {
    this.categorias.idCategoria = this.idCategoria
    this.usuario.idUsuario = environment.idUsuario

    this.produtos.categoriaRelacionada = this.categorias
    console.log("produto " + JSON.stringify(this.produtos))
    this.produtoService.postProduto(this.produtos).subscribe((resp: Produtos) => {
      this.produtos = resp
      // alert('Produto adicionado com sucesso')
    })

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Produto adicionado com sucesso'
    })
    
  }
}
