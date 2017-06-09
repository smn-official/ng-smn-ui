import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
