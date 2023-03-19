import { Component, ViewEncapsulation,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None

})
export class AppComponent implements OnInit{
  title = 'allinone';

  constructor(){
    // this.clearLocalStorage()
  }

  ngOnInit(): void {
    
  }

  // clearLocalStorage(){
  //   console.log("call local storage in app component");
  //   setTimeout(()=>{
  //       window.location.reload()
  //       alert("Seession is over login again :-)")
  //       localStorage.clear();
  //   },300000)
  // }

}
