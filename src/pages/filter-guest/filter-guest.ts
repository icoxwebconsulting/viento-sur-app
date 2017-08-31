import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ParamsHotelService} from '../../providers/params-hotel.service';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-filter-guest',
    templateUrl: 'filter-guest.html'
})
export class FilterGuestPage {
    // number of adults
    public adults = 1;

    // number of children
    public children = 0;

    public guests: any;

    constructor(public nav: NavController,
                private paramsHotel: ParamsHotelService) {
    }

    // minus adult when click minus button
    minusAdult() {
        this.adults--;
    }

    // plus adult when click plus button
    plusAdult() {
        this.adults++;
    }

    // minus children when click minus button
    minusChildren() {
        this.children--;
    }

    // plus children when click plus button
    plusChildren() {
        this.children++;
    }

    // go to search hotel page
    goToSearch() {
        this.nav.pop();
    }

    setGuests() {

        let guests = {};

        if (this.children > 0) {
            guests = {'adults': this.adults, 'children': this.children};

        } else{
            guests = {'adults': this.adults};
        }

        this.paramsHotel.setGuests(guests);
        this.guests = this.paramsHotel.getGuests();
        console.log('guests', this.guests);
    }

}
