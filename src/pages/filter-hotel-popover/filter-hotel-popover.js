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
import { FilterHotelPage } from "../filter-hotel/filter-hotel";
/**
 * Generated class for the FilterHotelPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FilterHotelPopoverPage = (function () {
    function FilterHotelPopoverPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    FilterHotelPopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FilterHotelPopoverPage');
    };
    FilterHotelPopoverPage.prototype.goToFilters = function () {
        this.navCtrl.push(FilterHotelPage);
    };
    return FilterHotelPopoverPage;
}());
FilterHotelPopoverPage = __decorate([
    Component({
        selector: 'page-filter-hotel-popover',
        templateUrl: 'filter-hotel-popover.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], FilterHotelPopoverPage);
export { FilterHotelPopoverPage };
//# sourceMappingURL=filter-hotel-popover.js.map