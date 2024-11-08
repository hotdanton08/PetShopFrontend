// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { FaqComponent } from './pages/faq/faq.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
    data: { roles: ['user', 'admin'] },
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard],
    data: { roles: ['user', 'admin'] },
  },
  { path: 'faq', component: FaqComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
    data: { roles: ['user', 'admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
