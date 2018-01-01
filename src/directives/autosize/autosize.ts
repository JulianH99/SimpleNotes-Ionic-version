import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

/**
 * Generated class for the AutosizeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: 'ion-textarea[autosize]' // Attribute selector
})
export class AutosizeDirective implements OnInit {


  ngOnInit(): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {

  }



  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement) {
    this.adjust();
  }


  adjust() {
    let elem = this.element.nativeElement.querySelector('textarea');
    if(elem) {
      elem.style.overflow = 'hidden';
      elem.style.height = 'auto';
      elem.style.height = elem.scrollHeight + 'px';
    }
  }

}
