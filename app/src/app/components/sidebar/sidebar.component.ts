import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() getRegion = new EventEmitter;

  public categorieSelected = "o país"

  public country = {
    region: 'all'
  }

  constructor() { }

  ngOnInit() {}

  handleChange(region){
    this.getRegion.emit({
      "region": region
    });
  }

}
