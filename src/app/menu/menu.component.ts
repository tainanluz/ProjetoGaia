import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Categorias } from '../model/Categorias';
import { ItemCarrinho } from '../model/ItemCarrinho';
import { Produtos } from '../model/Produtos';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriasService } from '../service/categorias.service';
import { ProdutosService } from '../service/produtos.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  usuario: Usuario = new Usuario
  senhaConfirma: string
  listaCategorias: Categorias[]
  listaProdutos: Produtos[]
  isLogged = false;
  itemCarrinho: ItemCarrinho
  listaCarrinho: ItemCarrinho[]
  usuarioLogin: UsuarioLogin = new UsuarioLogin()
  isDark:boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriasService,
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.isLogged = this.authService.isLogged()
    this.findAllProduto()
    this.findAllCarrinho()
    this.getDarkMode()
  }

  confirmarSenha(event: any) {
    this.senhaConfirma = event.target.value
  }

  cadastrar() {
    if (this.usuario.senha != this.senhaConfirma) {
      alert('As senhas estão incorretas')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/home'])
        this.ngOnInit();
        alert('Usuário cadastrado com sucesso!')
      })
    }

  }

  finalizar(): void {
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
      title: 'Página em construção'
    })
  }

  
  login() {
    this.authService.login(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp;

      environment.token = this.usuarioLogin.token
      localStorage.setItem('token', this.usuarioLogin.token)
      environment.nome = this.usuarioLogin.nome
      environment.idUsuario = this.usuarioLogin.idUsuario

      this.router.navigate(['/home'])
      this.findAllCategorias()
      this.findAllProduto()
      window.location.reload();
    }, erro => {
      if (erro.status == 400) {
        alert('Usuário ou senha estão incorretos!');
      }
    })
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/home']);
    this.ngOnInit();
  }

  findAllCarrinho() {
    this.listaCarrinho = this.carrinhoService.getAllCarrinho();
  }

  findAllProduto() {
    this.produtosService.getAllProduto().subscribe((resp: Produtos[]) => {
      this.listaProdutos = resp
    })
  }
  teste() {
    this.findAllCarrinho();
    console.log(this.listaCarrinho);

  }

  getTotal(){
    var total = 0;
    for(var i = 0; i < this.listaCarrinho.length; i++){
        var items = this.listaCarrinho[i];
        total += (items.produtos.preco * items.quantidade);
    }
    return total;
  }

  // teste2() {
  //   this.findAllProduto();
  //   console.log(this.listaProdutos);
  // }
  findAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categorias[]) => {
      this.listaCategorias = resp
    })
  }

  removerAll(produtos: Produtos):void{
    this.carrinhoService.removerAll(produtos);
    this.teste();
  }

  diminuirqtd(itemCarrinho: ItemCarrinho):void{
    this.carrinhoService.removerItem(itemCarrinho);
    this.teste();
  }
  
  adicionarItem(itemCarrinho: ItemCarrinho):void{
    this.carrinhoService.adicionarItem(itemCarrinho);
    this.teste();
}

getDarkMode(): boolean {
 return this.isDark = this.carrinhoService.getDarkMode();
}
}

