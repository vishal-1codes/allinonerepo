import { Directive,ElementRef,HostListener,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBtnborder]'
})
export class BtnborderDirective {

  constructor(private element:ElementRef, private render:Renderer2) { }


  @HostListener('mouseenter') onmouseover(){
    this.render.setStyle(this.element.nativeElement,'border','1px solid green')
  }

  @HostListener('mouseleave') onmouseout(){
    this.render.setStyle(this.element.nativeElement,'border','1px solid red')
  }

}
