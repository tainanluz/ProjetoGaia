import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'aboutUs', component:AboutUsComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'menu', component:MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
