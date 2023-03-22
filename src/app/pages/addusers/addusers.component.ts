import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.scss']
})
export class AddusersComponent implements OnInit {

  numberRegEx = /\-?\d*\.?\d{1,2}/;

  sportArr = [
    { id: 1, game: "Cricket" },
    { id: 2, game: "Bootball" },
    { id: 3, game: "Kabdhi" },
    { id: 4, game: "Nothing" },
  ];


  crudForm = new FormGroup({
    namev: new FormControl('', [Validators.required]),
    numberv: new FormControl('', [Validators.required]),
    sportv: new FormControl('', [Validators.required]),
  });

  constructor(private router:Router,private globalservice:GlobalService) { }

  ngOnInit(): void {
  }


  back(){
    this.router.navigateByUrl("/listusers")
  }

  gotohome(){
    this.router.navigateByUrl("/home")
  }

  onSubmit(){
    console.log("get cruduser data",this.crudForm.value);

    const data={
      name:this.crudForm.value.namev,
      number:this.crudForm.value.numberv,
      sport:this.crudForm.value.sportv
    }

    this.globalservice.addCrudUser(data).subscribe(res=>{
      console.log("crud user added",res);
      
      let promise=new Promise((resolve,reject)=>{
        if(res){
          resolve('save')
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
        console.log("Promise work correct");
        setTimeout(()=>{
          alert("user added successfuly")
          this.crudForm.reset()
          this.router.navigateByUrl("/listusers")
        },3000)
      })

    })


  }


}
