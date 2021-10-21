import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AdicionarCategoriaComponent } from './adicionar-categoria/adicionar-categoria.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { CategoriaPutComponent } from './edit/categoria-put/categoria-put.component';
import { ProdutosDeleteComponent } from './delete/produtos-delete/produtos-delete.component';
import { ProdutosPutComponent } from './edit/produtos-put/produtos-put.component';
import { Cadastrov2Component } from './cadastrov2/cadastrov2.component';
import { Loginv2Component } from './loginv2/loginv2.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ProdutoComponent } from './produto/produto.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AboutUsComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    AdicionarCategoriaComponent,
    CategoriaDeleteComponent,
    CategoriaPutComponent,
    ProdutosDeleteComponent,
    ProdutosPutComponent,
    Cadastrov2Component,
    Loginv2Component,
    CarrinhoComponent,
    ProdutoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
