import {Component, ViewChild} from "@angular/core";
import {NavController, AlertController, LoadingController} from "ionic-angular";
// import {SearchLocationPage} from "../search-location/search-location";
import {FilterGuestPage} from "../filter-guest/filter-guest";
import {HotelPage} from "../hotel/hotel";
import {AutocompleteService} from '../../services/autocomplete-service';
import {SearchHotelService} from '../../services/search-hotel.service';
import {DataSearchHotelService} from '../../providers/data-search-hotel.service'
import {GLOBAL} from '../../providers/config';
import * as moment from "moment";

@Component({
    selector: 'page-search-hotel',
    templateUrl: 'search-hotel.html'
})
export class SearchHotelPage {
    @ViewChild('myNav') nav: NavController;
    // search condition
    public searchActive = true;
    public searching: any = false;
    public rooms: any;
    public date = moment();
    public minDate = this.date.format('YYYY-MM');
    public maxDate = moment(this.date).add(5, 'years').format(GLOBAL.dateFormat);
    public search = {
        name: "",
        persons: null,
        from: this.date.format(GLOBAL.dateFormat),
        to: moment(this.date).add(1, 'days').format(GLOBAL.dateFormat),
        year: new Date().getFullYear()
    };

    public querySearch: string;
    public destination: string;
    public distribution: string;
    public items: any[] = [];
    public params: any[] = [];
    public roomsArray: any[] = [];

    public currency = 'ARS';
    public language = 'es';

    constructor(public navCtrl: NavController,
                public autocompleteService: AutocompleteService,
                private dataSearch: DataSearchHotelService,
                public searchHotel: SearchHotelService,
                private alertCtrl: AlertController,
                ) {
    }

    ionViewDidLoad() {
        console.log('SearchHotelPage');
        this.initPage();
    }

    ionViewWillEnter() {
        // this.initPage();
    }

    autocomplete(querySearch: string) {
        if (this.querySearch.length > 2 && this.searchActive == true) {
            this.autocompleteService.getItems(querySearch)
                .then(data => {
                    if (data.code == 200) {
                        this.searching = false;
                        this.items = data.data;
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        } else {
            this.items = [];
        }
    }

    itemSelected(id: any, description: any, hotel_id, latitude, longitude) {
        this.searchActive = false;
        let splited = id.split('-');

        if (splited[0] == 'CITY') {
            this.destination = splited[1];
        }else {
            console.log(hotel_id +' - ' + latitude +' - '+ longitude)
        }

        this.params.push('id', id);
        this.querySearch = description;

        this.items = [];

        let destination = [{'destination': splited[1], description: description}];
        this.dataSearch.setDestination(destination);
    }

    changeFromDate(date) {
        if (date < this.date.format(GLOBAL.dateFormat)) {
            this.search.from = this.date.format(GLOBAL.dateFormat);
        }
        this.search.to = moment(date).add(1, 'days').format(GLOBAL.dateFormat);

    }

    changeToDate(date) {
        if (date <= this.search.from) {
            this.search.to = moment(this.date).add(1, 'days').format(GLOBAL.dateFormat);
            this.validDate();
        }
    }

    addRoom() {
        if (this.roomsArray.length < 4) {
            let rooms = {room: this.roomsArray.length + 1, persons: 1, adults: 1, children: 0};
            this.roomsArray.push(rooms);
        }
    }

    goRoom(roomNum) {
        this.dataSearch.setRooms(this.roomsArray);
        this.navCtrl.push(FilterGuestPage, {roomNum: roomNum})
            .then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
            })
    }

    removeRoom(roomNum) {
        for (let i = 0; this.roomsArray.length > i; i++) {
            if (this.roomsArray[i].room == roomNum) {
                this.roomsArray.splice(i, 1);
            }
        }
    }

    initPage() {
        this.dataSearch.getRooms()
            .then((val) => {
                if (val == null && this.roomsArray.length == 0) {
                    let roomTemp = {room: 1, persons: 1, adults: 1, children: 0};
                    this.roomsArray.push(roomTemp);
                } else {
                    this.roomsArray = JSON.parse(val);
                }
                // this.roomsArray = JSON.parse(val);
            });

        this.dataSearch.getDestination()
            .then((val) => {
                if (val != null) {
                    let arrDest = JSON.parse(val)
                    this.querySearch = arrDest[0].description;
                    this.destination = arrDest[0].destination;
                }
            });

        this.dataSearch.getSearchHotels()
            .then((val) => {
                if(val != null){
                    let response = JSON.parse(val);
                    let searchHotel = response[0];
                    console.log('searchHotel', searchHotel.checkin_date);
                    this.search.from = searchHotel.checkin_date;
                    this.search.to = searchHotel.checkout_date;
                }else {
                    console.log('error getSearchHotels')
                }
            });
    }

    onSearchInput($event) {
        if ($event.type == 'mousedown') {
            this.querySearch = null;
            this.destination = null;
            this.dataSearch.removeDestination();
            console.log('Mouse event');
        }

    }

    onSearch() {
        this.searchActive = true;
        if (this.querySearch != null) {
            if (this.querySearch.length < 3) {
                this.searching = false;
            } else {
                this.searching = true;
            }
        }
    }

    validDestination() {
        let alert = this.alertCtrl.create({
            subTitle: 'Debe ingresar un destino',
            buttons: ['Cerrar']
        });
        alert.present();
    }

    validDate() {
        let alert = this.alertCtrl.create({
            subTitle: 'Debe ingresar un fecha superior a la de Checkin',
            buttons: ['Cerrar']
        });
        alert.present();
    }

    // go to result page
    doSearch() {
        if (this.destination != null) {
            let guests = [];

            this.dataSearch.setRooms(this.roomsArray);

            if (this.roomsArray.length > 0) {
                for (let i = 0; this.roomsArray.length > i; i++) {
                    if (this.roomsArray[i].guests != null) {
                        guests.push(this.roomsArray[i].guests);
                    } else {
                        guests.push(this.roomsArray[i].adults);
                    }
                }
            }

            this.distribution = guests.join("!");

            let query = [
                {
                    country_code: 'AR',
                    checkin_date: this.search.from,
                    checkout_date: this.search.to,
                    destination: this.destination,
                    distribution: this.distribution,
                    language: this.language,
                    currency: this.currency,
                    filter: false
                }
            ];

            this.dataSearch.setSearchHotels(query);

            this.navCtrl.push(HotelPage)
                .then(() => {
                    const index = this.navCtrl.getActive().index;
                    this.navCtrl.remove(0, index);
                })
        } else {
            this.validDestination();

        }
    }

}
