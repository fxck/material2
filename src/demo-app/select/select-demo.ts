import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MdSelectChange} from '@angular/material';
import {Http} from '@angular/http';

import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/timer';
import {Observable} from 'rxjs/Observable';

const GITHUB_API_ENDPOINT = 'https://api.github.com';

@Component({
    moduleId: module.id,
    selector: 'select-demo',
    templateUrl: 'select-demo.html',
    styleUrls: ['select-demo.css'],
})
export class SelectDemo {
  isRequired = false;
  isDisabled = false;
  showSelect = false;
  currentDrink: string;
  searchTerm: string;
  latestChangeEvent: MdSelectChange;
  foodControl = new FormControl('pizza-1');

  selectHeaderAsyncControl = new FormGroup({
    search: new FormControl(),
    selected: new FormControl({})
  });

  users$ = this.selectHeaderAsyncControl
        .get('search')
        .valueChanges
        .startWith(null)
        .debounce(() => Observable.timer(200))
        .switchMap((term) => {
          if (term) {
            return this._http
              .get(`${GITHUB_API_ENDPOINT}/search/users?q=${term}`)
              .map((response) => response.json())
              .map((data) => data.items);
          } else {
            return this._http
              .get(`${GITHUB_API_ENDPOINT}/users`)
              .map((response) => response.json());
          }
        });

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  drinks = [
    {value: 'coke-0', viewValue: 'Coke'},
    {value: 'long-name-1', viewValue: 'Decaf Chocolate Brownie Vanilla Gingerbread Frappuccino'},
    {value: 'water-2', viewValue: 'Water'},
    {value: 'pepper-3', viewValue: 'Dr. Pepper'},
    {value: 'coffee-4', viewValue: 'Coffee'},
    {value: 'tea-5', viewValue: 'Tea'},
    {value: 'juice-6', viewValue: 'Orange juice'},
    {value: 'wine-7', viewValue: 'Wine'},
    {value: 'milk-8', viewValue: 'Milk'},
  ];

  filteredDrinks = this.drinks.slice();

  pokemon = [
    {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
    {value: 'charizard-1', viewValue: 'Charizard'},
    {value: 'squirtle-2', viewValue: 'Squirtle'}
  ];

  constructor(private _http: Http) { }

  toggleDisabled() {
    this.foodControl.enabled ? this.foodControl.disable() : this.foodControl.enable();
  }

  filterDrinks() {
    this.filteredDrinks = this.searchTerm ? this.drinks.filter(item => {
      return item.viewValue.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    }) : this.drinks.slice();
  }
}
