import {Component} from "@angular/core";
import {NavController, Platform, LoadingController, AlertController} from "ionic-angular";
import {SearchHotelService} from '../../services/search-hotel.service';
import {DataSearchHotelService} from "../../providers/data-search-hotel.service";
import {HotelService} from "../../services/hotel-service";
import {SearchHotelPage} from "../search-hotel/search-hotel";
import {FilterHotelPage} from "../filter-hotel/filter-hotel";
import {SortingHotel} from "../sorting-hotel/sorting-hotel";
import {HotelDetailPage} from "../hotel-detail/hotel-detail";

// declare var google: any;

@Component({
    selector: 'page-hotel',
    templateUrl: 'hotel.html'
})
export class HotelPage {
    // list of hotels
    public validate: boolean;
    public total: number;
    public offset = 0;
    public hotels: any[] = [];
    public dataH: any[] = [];
    public filter;
    public loading;
    // Map
    public map: any;

    public arraySearch: any[] = [];
    public hotelAvailabilities: any[] = [];
    public hotelDetail: any[] = [];
    public hotelArray: any[] = [];
    public facetsArray: any[] = [];
    public hotelIds: any[] = [];
    public tmpIds: any[] = [];

    constructor(public navCtrl: NavController,
                public hotelService: HotelService,
                public platform: Platform,
                private dataSearch: DataSearchHotelService,
                public searchHotel: SearchHotelService,
                public loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                // private popoverCtrl: PopoverController
    ) {
        // set sample data
        // this.hotels = hotelService.getAll();
    }

    ionViewDidLoad() {
        // init map
        // this.initializeMap();

    }

    ionViewCanEnter() {
        console.log('HotelPage');
        this.initPage();
    }

    // view hotel detail
    viewHotel(hotelId) {

        let query = [
            {
                country_code: 'AR',
                checkin_date: this.arraySearch[0].checkin_date,
                checkout_date: this.arraySearch[0].checkout_date,
                destination: this.arraySearch[0].destination,
                distribution: this.arraySearch[0].distribution,
                language: this.arraySearch[0].language,
                currency: this.arraySearch[0].currency,
                hotelId: hotelId
            }
        ];

        this.dataSearch.setHotelDetail(query);
        this.navCtrl.push(HotelDetailPage);
    }

    /*presentPopover(ev) {
        let popover = this.popoverCtrl.create(PopoverPage, {
        });
        popover.present({
            ev: ev
        });
    }*/

    initPage() {
        this.loading = this.loadingCtrl.create({
            content: 'Espere...'
        });

        this.loading.present().then(() => {
            this.dataSearch.getSearchHotels()
                .then((val) => {
                    this.arraySearch = JSON.parse(val);

                    this.dataHotels();

                })
                .catch(error => {
                    console.error(error);
                    this.loading.dismiss();
                    this.navBack();
                })
        })

    }

    goFilters() {
        this.navCtrl.push(FilterHotelPage)
    }

    goSorting() {
        this.navCtrl.push(SortingHotel)
    }

    navBack() {
        this.navCtrl.push(SearchHotelPage)
            .then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
            })
    }

    notFoundHotel() {
        let alert = this.alertCtrl.create({
            subTitle: 'No existen resultados para esta búsqueda',
            buttons: ['Cerrar']
        });
        alert.present();
        this.navBack();
    }

    doInfinite(infiniteScroll) {
        this.offset = this.offset+10;

        setTimeout(() => {

            infiniteScroll.complete();
        }, 4000);

        this.dataHotels();

    }

    dataHotels(){

        let query = 'country_code=AR' +
            '&checkin_date=' + this.arraySearch[0].checkin_date +
            '&checkout_date=' + this.arraySearch[0].checkout_date +
            '&destination=' + this.arraySearch[0].destination +
            '&distribution=' + this.arraySearch[0].distribution +
            '&language=' + this.arraySearch[0].language +
            '&currency=' + this.arraySearch[0].currency;

        if (this.arraySearch[0].filter === true) {
            if (typeof this.arraySearch[0].sorting != 'undefined') {
                query += '&sorting=' + this.arraySearch[0].sorting;
            }

            if (typeof this.arraySearch[0].amenities != 'undefined') {
                query += '&amenities=' + this.arraySearch[0].amenities;
            }

            if (typeof this.arraySearch[0].hotel_type != 'undefined') {
                query += '&hotel_type=' + this.arraySearch[0].hotel_type;
            }

            if (typeof this.arraySearch[0].payment_type != 'undefined') {
                query += '&payment_type=' + this.arraySearch[0].payment_type;
            }

            if (typeof this.arraySearch[0].meal_plans != 'undefined') {
                query += '&meal_plans=' + this.arraySearch[0].meal_plans;
            }

            if (typeof this.arraySearch[0].stars != 'undefined') {
                query += '&stars=' + this.arraySearch[0].stars;
            }

            if (typeof this.arraySearch[0].zones != 'undefined') {
                query += '&zones=' + this.arraySearch[0].zones;
            }

            if (typeof this.arraySearch[0].profiles != 'undefined') {
                query += '&profiles=' + this.arraySearch[0].profiles;
            }

            if (typeof this.arraySearch[0].hotel_chains != 'undefined') {
                query += '&hotel_chains=' + this.arraySearch[0].hotel_chains;
            }
        }

        this.searchHotel.getHotelsAvailabilities(query, this.offset)
            .then(data => {

                // this.hotelArray = data.data.items;

                this.facetsArray = data.data.facets;

                this.dataSearch.setFacets(this.facetsArray);

                this.total = data.data.paging.total;


                this.validate = this.validateScroll();

                if (data.data.items.length == 0) {
                    this.notFoundHotel();
                }

                for (let i = 0; data.data.items.length > i; i++) {
                    this.hotelArray.push(data.data.items[i]);
                }

                for (let t = 0; this.hotelArray.length > t; t++) {
                    if(this.hotelIds.length < 10){
                        this.hotelIds.push(this.hotelArray[t].id);
                        this.tmpIds.push(this.hotelArray[t].id);
                        this.hotels.push(this.hotelArray[t]);
                    }else {
                        if(this.hotelArray[t].id != this.hotelIds[t]){
                            this.hotelIds.push(this.hotelArray[t].id);
                            this.tmpIds.push(this.hotelArray[t].id);
                            this.hotels.push(this.hotelArray[t]);
                        }
                    }

                }

                let hotelIdsStr = this.tmpIds.join(',');

                let hotelsQuery = 'ids=' + hotelIdsStr + '&language=es';

                this.searchHotel.getHotels(hotelsQuery)
                    .then(detail => {
                        this.tmpIds = [];
                        let prompter;
                        // console.log('detail', detail);
                        console.log('this.hotels.length', this.hotels.length);
                        if(this.hotels.length == 10){
                            for (let j = 0; this.hotelIds.length > j; j++) {
                                if(this.hotelArray[j].id == this.hotels[j].id){
                                    // this.hotels.push(detail.data[this.hotelIds[j]]);
                                    this.hotels[j]['main_picture'] = detail.data[this.hotelIds[j]].main_picture;
                                    prompter = j;
                                }
                            }
                        }else{
                            for (let j = this.hotelIds.length - 10; this.hotelIds.length > j; j++) {
                                if(this.hotelArray[j].id == this.hotels[j].id){
                                    // this.hotels.push(detail.data[this.hotelIds[j]]);
                                    this.hotels[j]['main_picture'] = detail.data[this.hotelIds[j]].main_picture;
                                    prompter = j;
                                }
                            }
                        }

                        if(this.hotels[prompter].main_picture.url != ''){
                            this.dataH = this.hotels;
                        }

                        this.loading.dismiss();

                    })
                    .catch(error => {
                        console.error(error);
                        this.navBack();
                        // loading.dismiss();

                    })
            })
            .catch(error => {
                console.error(error);
                this.navBack();
            })

    }

    validateScroll(){
        let limit = 10;
        let result = true;
        let compare = this.total - this.offset;

        if(this.total < limit ){
            result = false
        } else if(compare < limit ){
            result = false
        }

        return result;
    }
}
