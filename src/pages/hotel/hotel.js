var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavController, Platform, LoadingController, AlertController } from "ionic-angular";
import { SearchHotelService } from '../../services/search-hotel.service';
import { DataSearchHotelService } from "../../providers/data-search-hotel.service";
import { HotelService } from "../../services/hotel-service";
import { SearchHotelPage } from "../search-hotel/search-hotel";
import { FilterHotelPage } from "../filter-hotel/filter-hotel";
import { SortingHotel } from "../sorting-hotel/sorting-hotel";
// import {HotelDetailPage} from "../hotel-detail/hotel-detail";
// declare var google: any;
var HotelPage = (function () {
    function HotelPage(navCtrl, hotelService, platform, dataSearch, searchHotel, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.hotelService = hotelService;
        this.platform = platform;
        this.dataSearch = dataSearch;
        this.searchHotel = searchHotel;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.offset = 0;
        this.hotels = [];
        this.params = {
            checkin_date: '',
            checkout_date: '',
            destination: '',
            distribution: '',
            language: '',
            currency: '',
            sorting: '',
            amenities: '',
            hotel_type: '',
            payment_type: '',
            meal_plans: '',
            stars: '',
            zones: '',
            profiles: '',
            hotel_chains: ''
        };
        this.arraySearch = [];
        this.hotelAvailabilities = [];
        this.hotelDetail = [];
        this.hotelArray = [];
        this.facetsArray = [];
        this.hotelIds = [];
        // set sample data
        // this.hotels = hotelService.getAll();
    }
    HotelPage.prototype.ionViewDidLoad = function () {
        // init map
        // this.initializeMap();
    };
    HotelPage.prototype.ionViewWillEnter = function () {
        console.log('HotelPage');
        this.initPage();
    };
    // view hotel detail
    HotelPage.prototype.viewHotel = function (hotelId) {
        // this.navCtrl.push(HotelDetailPage, {id: hotelId});
    };
    /*presentPopover(ev) {
        let popover = this.popoverCtrl.create(PopoverPage, {
        });
        popover.present({
            ev: ev
        });
    }*/
    HotelPage.prototype.initPage = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Espere...'
        });
        this.loading.present().then(function () {
            _this.dataSearch.getSearchHotels()
                .then(function (val) {
                _this.arraySearch = JSON.parse(val);
                _this.dataHotels();
            })
                .catch(function (error) {
                console.error(error);
                _this.loading.dismiss();
            });
        });
    };
    HotelPage.prototype.goFilters = function () {
        this.navCtrl.push(FilterHotelPage);
    };
    HotelPage.prototype.goSorting = function () {
        this.navCtrl.push(SortingHotel);
    };
    HotelPage.prototype.navBack = function () {
        var _this = this;
        this.navCtrl.push(SearchHotelPage)
            .then(function () {
            var index = _this.navCtrl.getActive().index;
            _this.navCtrl.remove(0, index);
        });
    };
    HotelPage.prototype.notFoundHotel = function () {
        var alert = this.alertCtrl.create({
            subTitle: 'No existen resultados para esta búsqueda',
            buttons: ['Cerrar']
        });
        alert.present();
        this.navBack();
    };
    HotelPage.prototype.doInfinite = function (infiniteScroll) {
        this.offset = this.offset + 10;
        setTimeout(function () {
            infiniteScroll.complete();
        }, 4000);
        this.dataHotels();
    };
    HotelPage.prototype.dataHotels = function () {
        var _this = this;
        var query = 'country_code=AR' +
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
            .then(function (data) {
            // this.hotelArray = data.data.items;
            _this.facetsArray = data.data.facets;
            _this.dataSearch.setFacets(_this.facetsArray);
            _this.total = data.data.paging.total;
            // console.log('this.total', this.total);
            _this.offsetPaging = data.data.paging.offset;
            console.log('this.offsetPaging', _this.offsetPaging);
            if (data.data.items.length == 0) {
                _this.notFoundHotel();
            }
            for (var i = 0; data.data.items.length > i; i++) {
                _this.hotelArray.push(data.data.items[i]);
            }
            for (var t = 0; _this.hotelArray.length > t; t++) {
                if (_this.hotelIds.length < 10) {
                    _this.hotelIds.push(_this.hotelArray[t].id);
                    _this.hotels.push(_this.hotelArray[t]);
                }
                else {
                    if (_this.hotelArray[t].id != _this.hotelIds[t]) {
                        _this.hotelIds.push(_this.hotelArray[t].id);
                        _this.hotels.push(_this.hotelArray[t]);
                    }
                }
            }
            var hotelIdsStr = _this.hotelIds.join(',');
            var hotelsQuery = 'ids=' + hotelIdsStr + '&language=es';
            _this.searchHotel.getHotels(hotelsQuery)
                .then(function (detail) {
                console.log('detail', detail);
                for (var j = 0; _this.hotelIds.length > j; j++) {
                    if (_this.hotelArray[j].id == _this.hotels[j].id) {
                        // this.hotels.push(detail.data[this.hotelIds[j]]);
                        _this.hotels[j]['main_picture'] = detail.data[_this.hotelIds[j]].main_picture;
                    }
                }
                _this.loading.dismiss();
            })
                .catch(function (error) {
                console.error(error);
                // loading.dismiss();
            });
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    return HotelPage;
}());
HotelPage = __decorate([
    Component({
        selector: 'page-hotel',
        templateUrl: 'hotel.html'
    }),
    __metadata("design:paramtypes", [NavController,
        HotelService,
        Platform,
        DataSearchHotelService,
        SearchHotelService,
        LoadingController,
        AlertController])
], HotelPage);
export { HotelPage };
//# sourceMappingURL=hotel.js.map