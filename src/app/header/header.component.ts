import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  /**
   * TODO where is the page changed ever used?
   */
  @Output() pageChanged = new EventEmitter<string>();
  @Input() currentPath:string;

  manageDropdownShowing=false;

  /**
   * TODO Purpose?
   */
  onChangePage(newPath: string) {
    this.pageChanged.emit(newPath);
  }
}
