import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerToken:any;
  registerTokenInfo:any="User Not Found";

  sessionUser:any;

  visible:boolean = false

  constructor(private globalservice:GlobalService,private router:Router ,private location:Location) {
    this.getActivatedTokenUser()
  }

  ngOnInit(): void {
  }

  getActivatedTokenUser(){
    this.registerToken=this.location.getState()
    console.log("type of--",this.registerToken,typeof(this.registerToken));
    if(this.registerToken.tokenuserdata!=undefined){
      this.registerTokenInfo=this.registerToken.tokenuserdata.email
      console.log("get activate token--",this.registerToken,this.registerTokenInfo);

      // setTimeout(()=>{
      //   window.location.reload()
      //   alert("Seession is over login again :-)")
      //   localStorage.clear();
      // },300000)
      this.sessionUser=this.registerToken.tokenuserdata
      // console.log("session user",this.sessionUser);
      //https://www.youtube.com/watch?v=TOpBvAOvU2A
      //localStorage.removeItem('currentGame');
      //localStorage.clear();

      // localStorage.setItem("session",JSON.stringify(this.sessionUser))
      // localStorage.getItem("session")
      // this.session =JSON.parse(data);

    }else{
      alert("Not get user--")
    }
    
    
  }


  showAddUsers(){
    this.visible = !this.visible
  }

}
