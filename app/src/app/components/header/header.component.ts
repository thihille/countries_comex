import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() region = "default";
  public primaryColorLogo = "second-";
  public secondColorLogo = "second-";
  public enableButtonBack: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.primaryColorLogo = this.region;
    this.secondColorLogo = "second-"+this.region;

    this.route.params.subscribe(res => res.code ? this.enableButtonBack = true : this.enableButtonBack = false);
  }

}
