var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataSearchHotelService } from "../../providers/data-search-hotel.service";
import { HotelPage } from "../../pages/hotel/hotel";
/**
 * Generated class for the FilterHotelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SortingHotel = (function () {
    function SortingHotel(navCtrl, navParams, dataSearch) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataSearch = dataSearch;
        this.facetsArray = [];
    }
    SortingHotel.prototype.ionViewDidLoad = function () {
        this.initPage();
    };
    SortingHotel.prototype.ionViewWillEnter = function () {
        // this.initPage();
    };
    SortingHotel.prototype.initPage = function () {
        var _this = this;
        this.dataSearch.getFacets()
            .then(function (val) {
            console.log('val', JSON.parse(val));
            _this.facetsArray = JSON.parse(val);
            /*if (val == null && this.roomsArray.length == 0) {
                let roomTemp = {room: 1, persons: 1, adults: 1, children: 0};
                this.roomsArray.push(roomTemp);
            } else {
                this.roomsArray = JSON.parse(val);
            }*/
            // this.roomsArray = JSON.parse(val);
        });
    };
    SortingHotel.prototype.popView = function () {
        this.navCtrl.pop();
    };
    SortingHotel.prototype.getSorting = function (value, model) {
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
    };
    SortingHotel.prototype.getFacets = function (value, criteria) {
        console.log('value', value.join(','));
        console.log('criteria', criteria);
        var strData = value.join(',');
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
    };
    SortingHotel.prototype.applyFilters = function () {
        var _this = this;
        var data;
        var query;
        this.dataSearch.getSearchHotels()
            .then(function (val) {
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
            if (typeof _this.sorting != 'undefined') {
                query[0]['sorting'] = _this.sorting;
            }
            if (typeof data[0].amenities != 'undefined') {
                query[0]['amenities'] = data[0].amenities;
            }
            if (typeof data[0].hotelType != 'undefined') {
                query[0]['hotel_type'] = data[0].hotelType;
            }
            if (typeof data[0].paymentType != 'undefined') {
                query[0]['payment_type'] = data[0].paymentType;
            }
            if (typeof data[0].mealPlans != 'undefined') {
                query[0]['meal_plans'] = data[0].mealPlans;
            }
            if (typeof data[0].stars != 'undefined') {
                query[0]['stars'] = data[0].stars;
            }
            if (typeof data[0].zones != 'undefined') {
                query[0]['zones'] = data[0].zones;
            }
            if (typeof data[0].profiles != 'undefined') {
                query[0]['profiles'] = data[0].profiles;
            }
            if (typeof data[0].hotelChains != 'undefined') {
                query[0]['hotel_chains'] = data[0].hotelChains;
            }
            _this.dataSearch.setSearchHotels(query);
            _this.navCtrl.push(HotelPage)
                .then(function () {
                var index = _this.navCtrl.getActive().index;
                _this.navCtrl.remove(0, index);
            });
        });
    };
    SortingHotel.prototype.navBack = function () {
        var _this = this;
        this.navCtrl.push(HotelPage)
            .then(function () {
            var index = _this.navCtrl.getActive().index;
            _this.navCtrl.remove(0, index);
        });
    };
    return SortingHotel;
}());
SortingHotel = __decorate([
    Component({
        selector: 'page-sorting-hotel',
        templateUrl: 'sorting-hotel.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        DataSearchHotelService])
], SortingHotel);
export { SortingHotel };
//# sourceMappingURL=sorting-hotel.js.map