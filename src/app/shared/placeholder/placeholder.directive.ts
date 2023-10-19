import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  viewContainerRef: ViewContainerRef;
  constructor(private _viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = _viewContainerRef;
  }
}
