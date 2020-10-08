import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() image: string = null;
  @Input() title: string = null;
  @Input() capital: string = null;
  

  constructor() { }

  ngOnInit() {
  }

}
