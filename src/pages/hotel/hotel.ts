import {Component} from "@angular/core";
import {NavController, Platform, LoadingController, AlertController} from "ionic-angular";
import {SearchHotelService} from '../../services/search-hotel.service';
import {DataSearchHotelService} from "../../providers/data-search-hotel.service";
import {HotelService} from "../../services/hotel-service";
import {SearchHotelPage} from "../search-hotel/search-hotel";
import {FilterHotelPage} from "../filter-hotel/filter-hotel";
import {SortingHotel} from "../sorting-hotel/sorting-hotel";
// import {HotelDetailPage} from "../hotel-detail/hotel-detail";

// declare var google: any;

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-hotel',
    templateUrl: 'hotel.html'
})
export class HotelPage {
    // list of hotels
    public tmpHotels: any[] = [];
    public hotels: any[] = [];
    public indexScroll = 5;
    public lengthResult: number;
    // Map
    public map: any;

    public arraySearch: any[] = [];
    public hotelAvailabilities: any[] = [];
    public hotelDetail: any[] = [];
    public hotelArray: any[] = [];
    public facetsArray: any[] = [];
    public hotelIds: any[] = [];

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

        // console.log('this.arraySearch', this.arraySearch);

    }

    ionViewWillEnter() {
        console.log('HotelPage');
        this.initPage();
    }

    // view hotel detail
    viewHotel(hotelId) {
        // this.navCtrl.push(HotelDetailPage, {id: hotelId});
    }

    /*presentPopover(ev) {
        let popover = this.popoverCtrl.create(PopoverPage, {
        });
        popover.present({
            ev: ev
        });
    }*/

    initPage() {
        let loading = this.loadingCtrl.create({
            content: 'Espere...'
        });

        loading.present().then(() => {
            this.dataSearch.getSearchHotels()
                .then((val) => {
                    this.arraySearch = JSON.parse(val);

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

                        console.log('query modificado', query)

                    }

                    this.searchHotel.getHotelsAvailabilities(query)
                        .then(data => {

                            this.hotelArray = data.data.items;

                            this.facetsArray = data.data.facets;

                            this.dataSearch.setFacets(this.facetsArray);

                            // console.log('data.data.items', data.data.items);

                            if (data.data.items.length == 0) {
                                this.notFoundHotel();
                            }

                            this.lengthResult = this.hotelArray.length;

                            for (let i = 0; this.hotelArray.length > i; i++) {
                                this.hotelIds.push(this.hotelArray[i].id);
                            }

                            let hotelIdsStr = this.hotelIds.join(',');

                            let hotelsQuery = 'ids=' + hotelIdsStr + '&language=es'

                            this.searchHotel.getHotels(hotelsQuery)
                                .then(detail => {

                                    for (let j = 0; this.hotelIds.length > j; j++) {
                                        this.tmpHotels.push(detail.data[this.hotelIds[j]]);
                                    }

                                    loading.dismiss();

                                    for (let i = 0; i < 5; i++) {
                                        this.hotels.push(this.tmpHotels[i]);
                                    }
                                })
                                .catch(error => {
                                    console.error(error);
                                    loading.dismiss();
                                })
                        })
                        .catch(error => {
                            console.error(error);
                            loading.dismiss();
                        })
                })
                .catch(error => {
                    console.error(error);
                    loading.dismiss();
                })

        })

    }

    goFilters() {
        this.navCtrl.push(FilterHotelPage)
        /*.then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
            })*/
    }

    goSorting() {
        this.navCtrl.push(SortingHotel)
        /*.then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
            })*/
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
        console.log('Begin async operation');
        console.log('this.indexScroll', this.indexScroll);
        console.log('this.lengthResult', this.lengthResult);

        setTimeout(() => {

            for (let i = 0; i < 5; i++) {
                this.hotels.push(this.tmpHotels[i + this.indexScroll]);
            }
            this.indexScroll = 5 + this.indexScroll;

            infiniteScroll.complete();
        }, 1000);
    }
}
