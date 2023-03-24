import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddusersComponent } from './pages/addusers/addusers.component';
import { EditusersComponent } from './pages/editusers/editusers.component';
import { ListusersComponent } from './pages/listusers/listusers.component';
import { AuthcaGuard } from './service/authca.guard';
import { CrudGuard } from './service/crud.guard';
import { UserchartComponent } from './pages/userchart/userchart.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthcaGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'adduser',component:AddusersComponent},

  {path:'edituser',component:EditusersComponent},
  {path:'listusers',component:ListusersComponent,canActivate:[CrudGuard]},
  {path:'userchart',component:UserchartComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
