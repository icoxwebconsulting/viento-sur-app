import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {LoadingController, NavController, AlertController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {HomePage} from "../home/home";
import {DataSearchHotelService} from "../../providers/data-search-hotel.service";
import {SearchHotelService} from "../../services/search-hotel.service";
import {AutocompleteService} from '../../services/autocomplete-service';
import {GLOBAL} from '../../providers/config';
import * as moment from "moment";
import {WelcomePage} from "../welcome/welcome";

@Component({
    selector: 'page-checkout-hotel-complete',
    templateUrl: 'checkout-hotel-complete.html',
})
export class CheckoutHotelCompletePage {
    public loading;

    constructor(public nav: NavController,
                private alertCtrl: AlertController,
                public dataSearch: DataSearchHotelService,
                public searchHotel: SearchHotelService,
                public loadingCtrl: LoadingController) {
    }

    ionViewCanEnter() {
        console.log('CheckoutHotelCompletePage');
        // this.amenitiesIds = [];
        this.initPage();
    }

    initPage() {
        this.loading = this.loadingCtrl.create({
            content: 'Espere...'
        });

        this.loading.present()
            .then(() => {
                this.loading.dismiss();
                this.doAlert()
            })
    }

    home() {
        this.nav.push(WelcomePage);
    }

    doAlert() {
        this.alertCtrl.create()
            .setTitle('Alert')
            .setSubTitle('Subtitle')
            .setMessage('This is an alert message.')
            .addButton('OK')
            .present();
    }


}
