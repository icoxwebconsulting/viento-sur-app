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
import { NavController, NavParams } from "ionic-angular";
import { DataSearchHotelService } from '../../providers/data-search-hotel.service';
import { SearchHotelPage } from '../search-hotel/search-hotel';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var FilterGuestPage = (function () {
    function FilterGuestPage(navCtrl, navParams, dataSearch) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataSearch = dataSearch;
        this.roomsArray = [];
        this.room = { room: null, persons: null, adults: null, children: null };
        // number of adults
        this.adults = this.room.adults;
        // number of children
        this.children = 0;
        this.minors = [];
        this.age = 0;
    }
    FilterGuestPage.prototype.ionViewDidLoad = function () {
        this.roomNum = this.navParams.get('roomNum');
        this.initPage(this.roomNum);
    };
    // minus adult when click minus button
    FilterGuestPage.prototype.minusAdult = function () {
        this.room.adults--;
    };
    // plus adult when click plus button
    FilterGuestPage.prototype.plusAdult = function () {
        this.room.adults++;
    };
    // minus children when click minus button
    FilterGuestPage.prototype.minusChildren = function () {
        this.room.children--;
        this.minors.pop();
    };
    // plus children when click plus button
    FilterGuestPage.prototype.plusChildren = function () {
        this.room.children++;
        this.minors.push({ minor: this.room.children, age: 0 });
    };
    FilterGuestPage.prototype.plusAge = function (data) {
        // this.age++;
        for (var i = 0; this.minors.length > i; i++) {
            if (this.minors[i].minor == data.minor && data.age < 18) {
                var editData = { minor: data.minor, age: data.age + 1 };
                this.minors[i] = editData;
            }
        }
    };
    FilterGuestPage.prototype.minusAge = function (data) {
        // this.age++;
        for (var i = 0; this.minors.length > i; i++) {
            if (this.minors[i].minor == data.minor && data.age < 18) {
                var editData = { minor: data.minor, age: data.age - 1 };
                this.minors[i] = editData;
            }
        }
    };
    // go to search hotel page
    FilterGuestPage.prototype.goToSearch = function () {
        this.navCtrl.pop();
    };
    FilterGuestPage.prototype.initPage = function (roomNum) {
        var _this = this;
        this.dataSearch.getRooms().then(function (val) {
            _this.roomsArray = JSON.parse(val);
            var minors;
            for (var i = 0; _this.roomsArray.length > i; i++) {
                if (_this.roomsArray[i].room == roomNum) {
                    _this.room = _this.roomsArray[i];
                    if (_this.roomsArray[i].children > 0) {
                        // if(this.roomsArray[i].age != nu)
                        minors = _this.roomsArray[i].age.split('-');
                    }
                }
            }
            if (minors != null) {
                for (var i = 0; minors.length > i; i++) {
                    _this.minors.push({ minor: (i + 1), age: parseInt(minors[i]) });
                }
            }
        });
    };
    FilterGuestPage.prototype.setGuests = function () {
        var _this = this;
        var children = [];
        var strChildren;
        if (this.minors.length > 0) {
            for (var i = 0; this.minors.length > i; i++) {
                children.push(this.minors[i].age);
            }
            strChildren = children.join("-");
        }
        for (var i = 0; this.roomsArray.length > i; i++) {
            if (this.roomsArray[i].room == this.roomNum) {
                var guests = void 0;
                if (strChildren == null) {
                    guests = this.room.adults;
                }
                else {
                    guests = this.room.adults + '-' + strChildren;
                }
                var room = {
                    room: this.roomNum,
                    persons: this.room.adults + this.room.children,
                    adults: this.room.adults,
                    children: this.room.children,
                    age: strChildren,
                    guests: guests
                };
                this.roomsArray[i] = room;
            }
        }
        this.dataSearch.setRooms(this.roomsArray);
        this.navCtrl.push(SearchHotelPage).then(function () {
            var index = _this.navCtrl.getActive().index;
            _this.navCtrl.remove(0, index);
        });
    };
    FilterGuestPage.prototype.navBack = function () {
        var _this = this;
        this.navCtrl.push(SearchHotelPage)
            .then(function () {
            var index = _this.navCtrl.getActive().index;
            _this.navCtrl.remove(0, index);
        });
    };
    return FilterGuestPage;
}());
FilterGuestPage = __decorate([
    Component({
        selector: 'page-filter-guest',
        templateUrl: 'filter-guest.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        DataSearchHotelService])
], FilterGuestPage);
export { FilterGuestPage };
//# sourceMappingURL=filter-guest.js.map