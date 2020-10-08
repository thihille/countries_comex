import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/countries.interface';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public getRegion: string = null;
  public country = {} as Country;
  public countries: Country[];
  public loading = true;
  public titleResults: string = null;

  constructor(private countriesService: CountriesService) { }

  ngOnInit() {
    this.getRegion ? this.getCountries(this.getRegion) : this.getCountries();
    this.formatTitleRegion();
  }

  receiverRegion(value){
    this.countries = [];
    this.loading = true;
    this.formatTitleRegion(value.region);
    this.getCountries(value.region);
  }

  getCountries(region = null){
    this.countriesService.getCountries(region).subscribe((countries: Country[]) => {
      this.countries = countries;
      this.loading = false;
    })
  }

  formatTitleRegion(value = null){

    switch (value) {
      case 'region/africa':
        this.titleResults = 'países do continente da África';
        break;

      case 'region/americas':
        this.titleResults = 'países da América';
        break;

      case 'region/asia':
        this.titleResults = 'países do continente da Ásia';
        break;

      case 'region/europe':
        this.titleResults = 'países da Europa';
        break;

      case 'region/oceania':
        this.titleResults = 'países da Oceania';
        break;
    
      default:
        this.titleResults = 'todos os países';
        break;
    }
  }

}
