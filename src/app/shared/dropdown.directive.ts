import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false; //binds to bootstrap call open to enable dropdown

  @HostListener("click" ) toggleOpen() {
      this.isOpen = !this.isOpen;
  }

}
