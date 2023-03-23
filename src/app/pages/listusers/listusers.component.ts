import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import {observable, Observable } from 'rxjs';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss']
})
export class ListusersComponent implements OnInit {

  allcruduser:any=[]

  constructor(private router:Router,private globalservice:GlobalService) {
    this.getCrudUsers()
  }

  ngOnInit(): void {
  }

  navigateBack(){
    this.router.navigateByUrl("/home")
  }

  addUsers(){
    this.router.navigateByUrl("/adduser")
  }

  getCrudUsers(){
    this.globalservice.getCrudUsers().subscribe(res=>{

      var obsevable=new Observable(observer=>{
            observer.next(res)
      })
      .subscribe(res=>{
        this.allcruduser=res
        // console.log("observable result",this.allcruduser);
      })
    })
  }


  delete(id:any){
    this.globalservice.deleteCrudUser(id).subscribe(res=>{
      // console.log("get delete user res",res);
      let promise=new Promise((resolve,reject)=>{
        if(res){
          resolve('deleted')
        }else{
          reject(new Error("Ooops something went wrong")) 
        }
      })

      promise.then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{
        // console.log("Promise work correct");
        setTimeout(()=>{
          alert("user deleted successfuly")
          this.getCrudUsers()
        },1000)
      })

    })
  }


  edit(id:any){
    console.log("get forwarded id",id);
    if(id){
      this.router.navigateByUrl("/edituser",{state:{id:id}})
    }else{
      // console.log("id not find");
      
    }
  }




}
