import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
  HostListener,
  HostBinding,
  ViewChild,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements AfterViewInit {
  isShowing = false;
  // @Input('appDropdown') set toggleDropdown(value: any) {
  //   if (value) {
  //     this.renderer.addClass(this.elementRef.nativeElement, 'show');
  //   } else {
  //     this.renderer.removeClass(this.elementRef.nativeElement, 'show');
  //   }
  // }

  dropEl: Element;

  @HostListener('document:click', ['$event']) toggleShowing(event: Event) {
    this.isShowing = this.elementRef.nativeElement.contains(event.target)
      ? !this.isShowing
      : false;

      if (this.isShowing) {
        this.renderer.addClass(this.dropEl, 'show');
      } else {
        this.renderer.removeClass(this.dropEl, 'show');
      }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let el = this.elementRef.nativeElement.querySelector('.dropdown-menu');
    //  console.log(typeof el);
    this.dropEl = el;
  }
}
