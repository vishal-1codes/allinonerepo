import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import {observable, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.scss']
})
export class EditusersComponent implements OnInit {

  getUserid:any;
  getUserData:any=[]

  userId=''
  userName=''
  userNumber=''
  userSport=''

  sportArr = [
    { id: 1, game: "Cricket" },
    { id: 2, game: "Bootball" },
    { id: 3, game: "Kabdhi" },
    { id: 4, game: "Nothing" },
  ];

  constructor(private globalservice:GlobalService,private router:Router) {
    this.getUserid=history.state
    console.log("get user id",this.getUserid);
    this.globalservice.getCrudUser(this.getUserid.id).subscribe(res=>{
      console.log("get user by id",res);
      let promise=new Promise((resolve,reject)=>{
        if(res){
          resolve('Get'),
          this.getUserData=res
          this.userName=this.getUserData[0].name
          this.userNumber=this.getUserData[0].number
          this.userSport=this.getUserData[0].sport
          this.userId=this.getUserData[0]._id
        }else{
          reject(new Error("User not found"))
        }
      })

      promise.then((res)=>{
        console.log(res);
        console.log("get data in getUserData",this.getUserData);
        
      })
      .catch((err)=>{
        console.log(err);
      })

    })

  }

  ngOnInit(): void {
  }

  back(){
    this.router.navigateByUrl("/listusers")
  }

  gotohome(){
    this.router.navigateByUrl("/home")
  }

  handleFormSubmit(form: NgForm){
    console.log("vv",form.value);

    const data={
      name:form.value.namev,
      number:form.value.numberv,
      sport:form.value.sportv
    }

    this.globalservice.editCrudUser(this.userId,data).subscribe(res=>{
      console.log("user updated",res);
      
      let promise=new Promise((resolve,reject)=>{
        if(res){
          resolve('Updated')
        }else{
          reject(new Error("User Not Updated"))
        }
      })
      promise.then((res)=>{
        console.log(res);
        this.router.navigateByUrl('/listusers')
      })
      .catch((err)=>{
        console.log(err);
      })
    })
  }

}
