import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SearchLocationPage} from "../search-location/search-location";
import {FilterGuestPage} from "../filter-guest/filter-guest";
import {HotelPage} from "../hotel/hotel";
import {AutocompleteService} from '../../services/autocomplete-service'

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-search-hotel',
    templateUrl: 'search-hotel.html'
})
export class SearchHotelPage {
    // search condition
    public search = {
        name: "",
        persons: 1,
        from: new Date().toISOString(),
        to: new Date().toISOString()
    }

    public destination: string;
    public items: any[] = [];
    public params: any[] = [];

    constructor(
        public nav: NavController,
        public _autocompleteService: AutocompleteService

    ) {
    }

    // choose place
    choosePlace() {
        this.nav.push(SearchLocationPage);
    }

    // choose number of guest
    chooseGuest() {
        this.nav.push(FilterGuestPage);
    }

    // go to result page
    doSearch() {
        this.nav.push(HotelPage);
    }

    autocomplete(destination: string) {
        if (this.destination.length > 2){
            this._autocompleteService.getItems(destination)
                .then(data =>{
                    this.items = data;
                    console.info(this.items);
                })
                .catch(error => {
                    console.error(error);
                })
        }else{
            this.items = [];
        }
    }

    itemSelected(id: any,desciption: any) {
        let splited = id.split('-');

        if (splited[0] == 'CITY'){
            console.log('CITY ',splited[1] );
        }

        this.params.push('id',  id);
        this.destination = desciption;

        this.items = [];

        console.info(this.params);
    }
}
