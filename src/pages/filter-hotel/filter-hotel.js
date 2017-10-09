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
var FilterHotelPage = (function () {
    function FilterHotelPage(navCtrl, navParams, dataSearch) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataSearch = dataSearch;
        this.facetsArray = [];
    }
    FilterHotelPage.prototype.ionViewDidLoad = function () {
        this.initPage();
    };
    FilterHotelPage.prototype.ionViewWillEnter = function () {
        // this.initPage();
    };
    FilterHotelPage.prototype.initPage = function () {
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
    FilterHotelPage.prototype.popView = function () {
        this.navCtrl.pop();
    };
    FilterHotelPage.prototype.getSorting = function (value, model) {
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
    FilterHotelPage.prototype.getFacets = function (value, criteria) {
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
    FilterHotelPage.prototype.applyFilters = function () {
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
            if (typeof data[0].sorting != 'undefined') {
                query[0]['sorting'] = data[0].sorting;
            }
            if (typeof _this.amenities != 'undefined') {
                query[0]['amenities'] = _this.amenities;
            }
            if (typeof _this.hotelType != 'undefined') {
                query[0]['hotel_type'] = _this.hotelType;
            }
            if (typeof _this.paymentType != 'undefined') {
                query[0]['payment_type'] = _this.paymentType;
            }
            if (typeof _this.mealPlans != 'undefined') {
                query[0]['meal_plans'] = _this.mealPlans;
            }
            if (typeof _this.stars != 'undefined') {
                query[0]['stars'] = _this.stars;
            }
            if (typeof _this.zones != 'undefined') {
                query[0]['zones'] = _this.zones;
            }
            if (typeof _this.profiles != 'undefined') {
                query[0]['profiles'] = _this.profiles;
            }
            if (typeof _this.hotelChains != 'undefined') {
                query[0]['hotel_chains'] = _this.hotelChains;
            }
            _this.dataSearch.setSearchHotels(query);
            _this.navCtrl.push(HotelPage)
                .then(function () {
                var index = _this.navCtrl.getActive().index;
                _this.navCtrl.remove(0, index);
            });
        });
    };
    FilterHotelPage.prototype.navBack = function () {
        var _this = this;
        this.navCtrl.push(HotelPage)
            .then(function () {
            var index = _this.navCtrl.getActive().index;
            _this.navCtrl.remove(0, index);
        });
    };
    return FilterHotelPage;
}());
FilterHotelPage = __decorate([
    Component({
        selector: 'page-filter-hotel',
        templateUrl: 'filter-hotel.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        DataSearchHotelService])
], FilterHotelPage);
export { FilterHotelPage };
//# sourceMappingURL=filter-hotel.js.map