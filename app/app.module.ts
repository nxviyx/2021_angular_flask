// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


//directives
import { AlertComponent } from './directives/alert/alert.component';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

// Services
import { AlertService } from './services/alert.service';
import { RegisterService } from './services/register.service';
import { AuthGuard } from './guard/auth.guard';
import { PatientService } from './services/patient.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderInterceptor } from './services/loader.interceptor';

// Routes
const patientsModule = () => import('./components/patients/patients.module').then(x => x.PatientsModule);
const usersModule = () => import('./components/users/users.module').then(x => x.UsersModule);
const modelsModule = () => import('./components/models/models.module').then(x => x.ModelsModule);

const appRoutes: Routes = [
  { path: '',component:LoginComponent},
  { path: 'login',component:LoginComponent},
  { path: 'register',component:RegisterComponent},
  { path: 'home',component:HomeComponent},
  { path: 'dashboard',component:DashboardComponent, canActivate: [AuthGuard]},
  { path: 'patients', loadChildren: patientsModule, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'models', loadChildren: modelsModule, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login'}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavBarComponent,
    AlertComponent,
    HomeComponent,
    DashboardComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: "enabled"})
  ],
  providers: [
    AuthGuard,
    RegisterService,
    PatientService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
