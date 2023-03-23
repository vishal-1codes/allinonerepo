import { CrudGuard } from './service/crud.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AddusersComponent } from './pages/addusers/addusers.component';
import { ListusersComponent } from './pages/listusers/listusers.component';
import { EditusersComponent } from './pages/editusers/editusers.component';
//23-03
import { AuthcaGuard } from './service/authca.guard';
import { AuthcaService } from './service/authca.service';
import { CrudService } from './service/crud.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AddusersComponent,
    ListusersComponent,
    EditusersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  //23-03
  providers: [AuthcaGuard,AuthcaService,CrudGuard,CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
