import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
  <div class="wrapper">  
    Carregando...
  </div>`,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }
  ngOnInit() {}

}
