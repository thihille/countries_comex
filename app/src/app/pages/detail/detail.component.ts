import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../models/countries.interface';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public codeCountry = null;
  country = {} as Country;
  countryDetail: Country;

  countriesByLanguages: any = [];
  countriesByCurrency: any = [];

  valuePopulation = null;
  valueArea = null;

  @Output() getCountryCode = new EventEmitter;

  constructor(private route: ActivatedRoute, private countriesService: CountriesService) {}

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.codeCountry = res.code
      this.getCountryDetail(this.codeCountry);
    });
    this.getCountryCode.emit(this.codeCountry);
  }

  getCountryDetail(code){
    this.countriesService.getCountryByCode(code).subscribe((country: Country) => {
      
      this.countryDetail = country;
      this.valuePopulation = new Intl.NumberFormat().format(country.population)
      this.valueArea = new Intl.NumberFormat().format(parseInt(country.area))
      
      country.languages.forEach(country => {  
        let language: any = {
          code: country["iso639_1"],
          name: country['name'],
          nativeName: country['nativeName'],
        }
        this.getCountryLanguages(language);
      });

      country.currencies.forEach(country => {
        let currency: any = {
          code: country['code'],
          name: country['name'],
          symbol: country['symbol'],
        }
        this.getCountryCurrency(currency)
      });      
    })
  }

  getCountryLanguages(language: any){
    this.countriesByLanguages = [];
    this.countriesService.getCountriesByLanguage(language.code).subscribe((countries: any) => {
      this.countriesByLanguages.push({
        language,
        'results': countries
      })
    })
    
  }

  getCountryCurrency(currency: any){
    this.countriesByCurrency = [];
    this.countriesService.getCountriesByCurrency(currency.code).subscribe((countries: any) => {
      this.countriesByCurrency.push({
        currency,
        'results': countries
      })
    })
    
  }

  

}
