import { AuthcaService } from './authca.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthcaGuard implements CanActivate {

  constructor(private authservice:AuthcaService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authservice.isAuthenticated()){
      return true;
    }else{
      this.router.navigateByUrl("/login")
      return false;
      
    }

  }
  
}
