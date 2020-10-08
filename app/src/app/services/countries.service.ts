import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private urlCountries = 'https://restcountries.eu/rest/v2/';
  private paramsCountries = '?fields=flag;translations;capital;alpha3Code';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCountries(region): Observable<any> {
    let getRegion = region ? region : 'all';
    return this.httpClient.get<any>(this.urlCountries + getRegion + this.paramsCountries)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getCountryByCode(code:string){
    return this.httpClient.get<any>(this.urlCountries + 'alpha/' + code)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getCountriesByLanguage(language){
    return this.httpClient.get<any>(this.urlCountries + 'lang/' + language.toLowerCase() + '?fields=flag;translations;alpha3Code')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getCountriesByCurrency(code){
    return this.httpClient.get<any>(this.urlCountries + 'currency/' + code.toLowerCase() + '?fields=flag;translations;alpha3Code')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
