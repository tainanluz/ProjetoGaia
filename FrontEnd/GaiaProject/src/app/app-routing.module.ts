import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdicionarCategoriaComponent } from './adicionar-categoria/adicionar-categoria.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContactComponent } from './contact/contact.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { CategoriaPutComponent } from './edit/categoria-put/categoria-put.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
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
  {path: 'produto-delete/:id', component:ProdutoDeleteComponent},
  {path: 'produto-edit/:id', component:ProdutoEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


