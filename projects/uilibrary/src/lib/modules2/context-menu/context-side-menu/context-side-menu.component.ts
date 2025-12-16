import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uilibrary2-context-side-menu',
  templateUrl: './context-side-menu.component.html'
})
export class ContextSideMenuComponent implements OnInit {
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
