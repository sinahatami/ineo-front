import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRouting } from './app.routing'

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomHttpInterceptor } from './auth/providers/custom-http-interceptor.service';
import { LoaderService } from './loader/loader.service';
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { LoaderModule } from './loader/loader.module';
import { AuthService } from './auth/providers/auth/auth.service';
import { AuthGuardService } from './auth/providers/guard/auth.guard';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouting,
    LoaderModule,
    ToastrModule.forRoot({
      disableTimeOut: true,
      // autoDismiss: false,
      positionClass: 'toast-top-center',
      closeButton: true,
      maxOpened: 1,
      autoDismiss: true
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    provideAnimationsAsync(),
    LoaderService,
    AuthGuardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
