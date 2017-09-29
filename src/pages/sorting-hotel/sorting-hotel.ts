import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DataSearchHotelService} from "../../providers/data-search-hotel.service";
import {HotelPage} from "../../pages/hotel/hotel";

/**
 * Generated class for the FilterHotelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-sorting-hotel',
    templateUrl: 'sorting-hotel.html',
})
export class SortingHotel {

    public sorting: any;
    public sortingPrice: any;
    public sortingStars: any;
    public sortingBest: any;
    public sortingOthers: any;
    public facetsArray: any[] = [];

    public amenities: any;
    public hotelType: any;
    public paymentType: any;
    public mealPlans: any;
    public stars: any;
    public zones: any;
    public profiles: any;
    public hotelChains: any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private dataSearch: DataSearchHotelService) {
    }


    ionViewDidLoad() {
        this.initPage();
    }

    ionViewWillEnter() {
        // this.initPage();
    }

    initPage() {
        this.dataSearch.getFacets()
            .then((val) => {
                console.log('val', JSON.parse(val));
                this.facetsArray = JSON.parse(val);


                /*if (val == null && this.roomsArray.length == 0) {
                    let roomTemp = {room: 1, persons: 1, adults: 1, children: 0};
                    this.roomsArray.push(roomTemp);
                } else {
                    this.roomsArray = JSON.parse(val);
                }*/

                // this.roomsArray = JSON.parse(val);
            });

    }

    popView(){
        this.navCtrl.pop();
    }

    getSorting(value: any, model: any) {
        if (model == 'sortingPrice') {
            this.sortingPrice = value;
            this.sortingStars = '';
            this.sortingBest = '';
            this.sortingOthers = '';
        }

        if (model == 'sortingStars') {
            this.sortingPrice = '';
            this.sortingStars = value;
            this.sortingBest = '';
            this.sortingOthers = '';
        }

        if (model == 'sortingBest') {
            this.sortingPrice = '';
            this.sortingStars = '';
            this.sortingBest = value;
            this.sortingOthers = '';
        }

        if (model == 'sortingOthers') {
            this.sortingPrice = '';
            this.sortingStars = '';
            this.sortingBest = '';
            this.sortingOthers = value;
        }

        this.sorting = value;
        console.log('this.sorting: ', this.sorting);
    }

    getFacets(value: any, criteria: any) {
        console.log('value', value.join(','))
        console.log('criteria', criteria)

        let strData = value.join(',');

        if (criteria == 'amenities') {
            this.amenities = strData;
        }

        if (criteria == 'hotel_type') {
            this.hotelType = strData;
        }

        if (criteria == 'payment_type') {
            this.paymentType = strData;
        }

        if (criteria == 'meal_plans') {
            this.mealPlans = strData;
        }

        if (criteria == 'stars') {
            this.stars = strData;
        }

        if (criteria == 'zones') {
            this.zones = strData;
        }

        if (criteria == 'profiles') {
            this.profiles = strData;
        }

        if (criteria == 'hotel_chains') {
            this.hotelChains = strData;
        }

    }

    applyFilters(){
        let data;
        let query;

        this.dataSearch.getSearchHotels()
            .then((val) => {
                data = JSON.parse(val);

                query = [
                    {
                        country_code: data[0].country_code,
                        checkin_date: data[0].checkin_date,
                        checkout_date: data[0].checkout_date,
                        destination: data[0].destination,
                        distribution: data[0].distribution,
                        language: data[0].language,
                        currency: data[0].currency,
                        filter: true
                    }
                ];

                if (typeof this.sorting != 'undefined'){
                    query[0]['sorting'] = this.sorting
                }

                if (typeof data[0].amenities != 'undefined'){
                    query[0]['amenities'] = data[0].amenities
                }

                if (typeof data[0].hotelType != 'undefined'){
                    query[0]['hotel_type'] = data[0].hotelType
                }

                if (typeof data[0].paymentType != 'undefined'){
                    query[0]['payment_type'] = data[0].paymentType;
                }

                if (typeof data[0].mealPlans != 'undefined'){
                    query[0]['meal_plans'] = data[0].mealPlans;
                }

                if (typeof data[0].stars != 'undefined'){
                    query[0]['stars'] = data[0].stars;
                }

                if (typeof data[0].zones != 'undefined'){
                    query[0]['zones'] = data[0].zones;
                }

                if (typeof data[0].profiles != 'undefined'){
                    query[0]['profiles'] = data[0].profiles;
                }

                if (typeof data[0].hotelChains != 'undefined'){
                    query[0]['hotel_chains'] = data[0].hotelChains;
                }

                this.dataSearch.setSearchHotels(query);

                this.navCtrl.push(HotelPage)
                    .then(() => {
                        const index = this.navCtrl.getActive().index;
                        this.navCtrl.remove(0, index);
                    })

            })
    }

    navBack(){
        this.navCtrl.push(HotelPage)
            .then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
            })
    }

}
