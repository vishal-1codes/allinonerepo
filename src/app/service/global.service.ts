import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  base_path:string="http://localhost:3000/";

  constructor(private httpclient:HttpClient) { }


  checkEmail(email:any){
    return this.httpclient.get(this.base_path+"get/"+email)
  }

  createNewUser(data:any){
    return this.httpclient.post(this.base_path+"post/",data)
  }

  checkToken(data:any){
    return this.httpclient.post(this.base_path+"profile",data)
  }


}
