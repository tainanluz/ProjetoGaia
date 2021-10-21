import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdicionarCategoriaComponent } from './adicionar-categoria/adicionar-categoria.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { Cadastrov2Component } from './cadastrov2/cadastrov2.component';
import { ContactComponent } from './contact/contact.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ProdutosDeleteComponent } from './delete/produtos-delete/produtos-delete.component';
import { CategoriaPutComponent } from './edit/categoria-put/categoria-put.component';
import { ProdutosPutComponent } from './edit/produtos-put/produtos-put.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Loginv2Component } from './loginv2/loginv2.component';
import { MenuComponent } from './menu/menu.component';
import { ProdutoComponent } from './produto/produto.component';


const routes: Routes = [
  {path:'', redirectTo:'produto', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'aboutUs', component:AboutUsComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'menu', component:MenuComponent},
  {path: 'login', component:LoginComponent},
  {path: 'cadastro', component:CadastroComponent},
  {path: 'adicionarCategoria', component:AdicionarCategoriaComponent},
  {path: 'categoria-delete/:id', component:CategoriaDeleteComponent},
  {path: 'categoria-put/:id', component:CategoriaPutComponent},
  {path: 'produtos-delete/:id', component:ProdutosDeleteComponent},
  {path: 'produtos-put/:id', component:ProdutosPutComponent},
  {path: 'cadastrov2', component:Cadastrov2Component},
  {path: 'loginv2', component:Loginv2Component},
  {path: 'produto/:id', component:ProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


