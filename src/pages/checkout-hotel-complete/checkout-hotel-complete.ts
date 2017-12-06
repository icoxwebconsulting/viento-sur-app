import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {LoadingController, NavController, AlertController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
// import {HomePage} from "../home/home";
import {DataSearchHotelService} from "../../providers/data-search-hotel.service";
import {SearchHotelService} from "../../services/search-hotel.service";
import {AutocompleteService} from '../../services/autocomplete-service';
import {GLOBAL} from '../../providers/config';
import * as moment from "moment";
// import {WelcomePage} from "../welcome/welcome";
import {SearchHotelPage} from "../search-hotel/search-hotel";

@Component({
    selector: 'page-checkout-hotel-complete',
    templateUrl: 'checkout-hotel-complete.html',
})
export class CheckoutHotelCompletePage {
    public loading;
    public price_detail: any;
    public booking_all_data: any;
    public destination: any;
    public booking: any;
    public hotelDetails: any;
    public reservation: any;
    public reservationDetails: any;
    public checkin_date: any;
    public checkout_date: any;
    public date = moment();
    public room_cancellation: any;
    public room_per_night: any;
    public taxes_and_rates: any;
    public discounts: any;
    public total_price: any;

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
            .then(() =>{
            this.dataSearch.getHotelBooking()
                .then( res => {
                    let data = JSON.parse(res);
                    this.room_cancellation = data.room_cancellation
                })
                this.dataSearch.getBookingComplete()
                    .then(res => {
                        let data = JSON.parse(res);

                        console.log('data', data);

                        this.price_detail = data.price_detail;
                        this.booking_all_data = data.booking_all_data;
                        this.destination = data.destination;
                        this.booking = data.booking;
                        this.hotelDetails = data.hotelDetails;
                        this.reservation = data.reservation;
                        this.reservationDetails = data.reservationDetails;

                        this.checkin_date = moment(this.reservationDetails.checkin_date).locale('es').format('lll');
                        this.checkout_date = moment(this.reservationDetails.checkout_date).locale('es').format('lll');

                        this.room_per_night = this.price_detail.nightly_subtotal;
                        this.taxes_and_rates = this.price_detail.taxes + this.price_detail.fee ;
                        this.discounts = this.price_detail.discounts;
                        this.total_price = this.price_detail.subtotal + this.taxes_and_rates - this.discounts;

                        console.log('this.total_price', this.total_price);

                        this.loading.dismiss();

                    })
            })


    }

    home() {
        this.nav.push(SearchHotelPage);
    }



}
