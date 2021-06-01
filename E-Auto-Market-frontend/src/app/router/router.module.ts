import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../views/login/login.component';
import { IndexListComponent } from '../views/index-list/index-list.component';
import { CarDetailComponent } from '../views/car-detail/car-detail.component';
import { PersonalComponent } from '../views/personal/personal.component';
import { OrderComponent } from '../views/personal/order/order.component';
import { WalletComponent } from '../views/personal/wallet/wallet.component';
import { UploadComponent } from '../views/seller/upload/upload.component';
import { SellerOrderComponent } from '../views/seller/seller-order/seller-order.component';
import { SellerComponent } from '../views/seller/seller.component';
import { SellerWalletComponent } from '../views/seller/seller-wallet/seller-wallet.component';
import { SignUpComponent } from '../views/sign-up/sign-up.component';
import { SecurityComponent } from '../views/personal/security/security.component';
import { SellerSecurityComponent } from '../views/seller/seller-security/seller-security.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'list',
    component: IndexListComponent
  },
  {
    path: 'detail/:id',
    component: CarDetailComponent
  },
  {
    path: 'signUp/:token',
    component: SignUpComponent
  },
  {
    path: 'personal',
    component: PersonalComponent,
    children: [
      {
        path: '',
        redirectTo: 'order',
        pathMatch: 'full'
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'security',
        component: SecurityComponent
      }
    ]
  },
  {
    path: 'seller',
    component: SellerComponent,
    children: [
      {
        path: '',
        redirectTo: 'order',
        pathMatch: 'full'
      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'order',
        component: SellerOrderComponent
      },
      {
        path: 'wallet',
        component: SellerWalletComponent
      },
      {
        path: 'security',
        component: SellerSecurityComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
