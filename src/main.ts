/// <reference types="@angular/localize" />

// import required packages
import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
//import { provideRouter } from '@angular/router';

//import { routes } from './app/root/router';
import { AppComponent } from './app/components/app-root/app-root';
import { ApiService } from './app/services/api.service';
import { AuthService } from './app/services/auth.service';
import { SubmitService } from './app/services/submit.service';
import { CancelService } from './app/services/cancel.service';

// FIXME remove this in production
localStorage.removeItem('userData');

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    //provideRouter(routes),
    ApiService,
    AuthService,
    SubmitService,
    CancelService,
  ],
}).catch(err => console.error(err));
