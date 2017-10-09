var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
// import {SearchLocationPage} from "../search-location/search-location";
import { FilterGuestPage } from "../filter-guest/filter-guest";
import { HotelPage } from "../hotel/hotel";
import { AutocompleteService } from '../../services/autocomplete-service';
import { SearchHotelService } from '../../services/search-hotel.service';
import { DataSearchHotelService } from '../../providers/data-search-hotel.service';
import { GLOBAL } from '../../providers/config';
import * as moment from "moment";
var SearchHotelPage = (function () {
    function SearchHotelPage(navCtrl, autocompleteService, dataSearch, searchHotel, alertCtrl) {
        this.navCtrl = navCtrl;
        this.autocompleteService = autocompleteService;
        this.dataSearch = dataSearch;
        this.searchHotel = searchHotel;
        this.alertCtrl = alertCtrl;
        // search condition
        this.searching = false;
        this.date = moment();
        this.minDate = this.date.format('YYYY-MM');
        this.maxDate = moment(this.date).add(5, 'years').format(GLOBAL.dateFormat);
        this.search = {
            name: "",
            persons: null,
            from: this.date.format(GLOBAL.dateFormat),
            to: moment(this.date).add(1, 'days').format(GLOBAL.dateFormat),
            year: new Date().getFullYear()
        };
        this.items = [];
        this.params = [];
        this.roomsArray = [];
        this.currency = 'ARS';
        this.language = 'es';
    }
    SearchHotelPage.prototype.ionViewDidLoad = function () {
        console.log('SearchHotelPage');
        this.initPage();
    };
    SearchHotelPage.prototype.ionViewWillEnter = function () {
        // this.initPage();
    };
    SearchHotelPage.prototype.autocomplete = function (querySearch) {
        var _this = this;
        if (this.querySearch.length > 2) {
            this.autocompleteService.getItems(querySearch)
                .then(function (data) {
                if (data.code == 200) {
                    _this.searching = false;
                    _this.items = data.data;
                }
            })
                .catch(function (error) {
                console.error(error);
            });
        }
        else {
            this.items = [];
        }
    };
    SearchHotelPage.prototype.itemSelected = function (id, description) {
        var splited = id.split('-');
        if (splited[0] == 'CITY') {
            this.destination = splited[1];
        }
        this.params.push('id', id);
        this.querySearch = description;
        this.items = [];
        var destination = [{ 'destination': splited[1], description: description }];
        this.dataSearch.setDestination(destination);
    };
    SearchHotelPage.prototype.changeFromDate = function (date) {
        if (date < this.date.format(GLOBAL.dateFormat)) {
            this.search.from = this.date.format(GLOBAL.dateFormat);
        }
        this.search.to = moment(date).add(1, 'days').format(GLOBAL.dateFormat);
    };
    SearchHotelPage.prototype.changeToDate = function (date) {
        if (date <= this.search.from) {
            this.search.to = moment(this.date).add(1, 'days').format(GLOBAL.dateFormat);
            this.validDate();
        }
    };
    SearchHotelPage.prototype.addRoom = function () {
        if (this.roomsArray.length < 4) {
            var rooms = { room: this.roomsArray.length + 1, persons: 1, adults: 1, children: 0 };
            this.roomsArray.push(rooms);
        }
    };
    SearchHotelPage.prototype.goRoom = function (roomNum) {
        var _this = this;
        this.dataSearch.setRooms(this.roomsArray);
        this.navCtrl.push(FilterGuestPage, { roomNum: roomNum })
            .then(function () {
            var index = _this.navCtrl.getActive().index;
            _this.navCtrl.remove(0, index);
        });
    };
    SearchHotelPage.prototype.removeRoom = function (roomNum) {
        for (var i = 0; this.roomsArray.length > i; i++) {
            if (this.roomsArray[i].room == roomNum) {
                this.roomsArray.splice(i, 1);
            }
        }
    };
    SearchHotelPage.prototype.initPage = function () {
        var _this = this;
        this.dataSearch.getRooms()
            .then(function (val) {
            if (val == null && _this.roomsArray.length == 0) {
                var roomTemp = { room: 1, persons: 1, adults: 1, children: 0 };
                _this.roomsArray.push(roomTemp);
            }
            else {
                _this.roomsArray = JSON.parse(val);
            }
            // this.roomsArray = JSON.parse(val);
        });
        this.dataSearch.getDestination()
            .then(function (val) {
            if (val != null) {
                var arrDest = JSON.parse(val);
                _this.querySearch = arrDest[0].description;
                _this.destination = arrDest[0].destination;
            }
        });
    };
    SearchHotelPage.prototype.onSearchInput = function ($event) {
        if ($event.type == 'mousedown') {
            this.querySearch = null;
            this.destination = null;
            this.dataSearch.removeDestination();
        }
    };
    SearchHotelPage.prototype.onSearch = function () {
        if (this.querySearch != null) {
            if (this.querySearch.length < 3) {
                this.searching = false;
            }
            else {
                this.searching = true;
            }
        }
    };
    SearchHotelPage.prototype.validDestination = function () {
        var alert = this.alertCtrl.create({
            subTitle: 'Debe ingresar un destiono',
            buttons: ['Cerrar']
        });
        alert.present();
    };
    SearchHotelPage.prototype.validDate = function () {
        var alert = this.alertCtrl.create({
            subTitle: 'Debe ingresar un fecha superior a la de Checkin',
            buttons: ['Cerrar']
        });
        alert.present();
    };
    // go to result page
    SearchHotelPage.prototype.doSearch = function () {
        var _this = this;
        if (this.destination != null) {
            var guests = [];
            this.dataSearch.setRooms(this.roomsArray);
            if (this.roomsArray.length > 0) {
                for (var i = 0; this.roomsArray.length > i; i++) {
                    if (this.roomsArray[i].guests != null) {
                        guests.push(this.roomsArray[i].guests);
                    }
                    else {
                        guests.push(this.roomsArray[i].adults);
                    }
                }
            }
            this.distribution = guests.join("!");
            var query = [
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
                .then(function () {
                var index = _this.navCtrl.getActive().index;
                _this.navCtrl.remove(0, index);
            });
        }
        else {
            this.validDestination();
        }
    };
    return SearchHotelPage;
}());
__decorate([
    ViewChild('myNav'),
    __metadata("design:type", NavController)
], SearchHotelPage.prototype, "nav", void 0);
SearchHotelPage = __decorate([
    Component({
        selector: 'page-search-hotel',
        templateUrl: 'search-hotel.html'
    }),
    __metadata("design:paramtypes", [NavController,
        AutocompleteService,
        DataSearchHotelService,
        SearchHotelService,
        AlertController])
], SearchHotelPage);
export { SearchHotelPage };
//# sourceMappingURL=search-hotel.js.map