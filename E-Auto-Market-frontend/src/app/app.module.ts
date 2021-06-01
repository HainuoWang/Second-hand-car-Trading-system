import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { AppRoutingModule } from './router/router.module';
import { AntDesignModule } from './ui/ant-design.module';
import { IndexListComponent } from './views/index-list/index-list.component';
import { CarDetailComponent } from './views/car-detail/car-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { WalletComponent } from './views/personal/wallet/wallet.component';
import { OrderComponent } from './views/personal/order/order.component';
import { PersonalComponent } from './views/personal/personal.component';
import { UploadComponent } from './views/seller/upload/upload.component';
import { SellerComponent } from './views/seller/seller.component';
import { SellerOrderComponent } from './views/seller/seller-order/seller-order.component';
import { SellerWalletComponent } from './views/seller/seller-wallet/seller-wallet.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexListComponent,
    CarDetailComponent,
    HeaderComponent,
    WalletComponent,
    OrderComponent,
    PersonalComponent,
    UploadComponent,
    SellerComponent,
    SellerOrderComponent,
    SellerWalletComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AntDesignModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
