import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // Teacher's solution
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}

  // MY SOLUTION
  //   isOpen: boolean;

  //   constructor(private elementRef: ElementRef, private rederer: Renderer2) {}

  //   @HostListener('click') mouseClick() {
  //     this.isOpen = !this.isOpen;

  //     if (this.isOpen)
  //       this.rederer.addClass(this.elementRef.nativeElement, 'open');
  //     else this.rederer.removeClass(this.elementRef.nativeElement, 'open');
  //   }
}
