import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHamburger]'
})
export class HamburgerDirective {
  @Input() navbarElement: ElementRef;
  isOpen;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen === true) {
      this._renderer.addClass(this.navbarElement, 'in');
    } else {
      this._renderer.removeClass(this.navbarElement, 'in');
    }

  }
  constructor(private _renderer: Renderer2) { }

}
