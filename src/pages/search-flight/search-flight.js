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
import { NavController } from "ionic-angular";
import { SearchLocationPage } from "../search-location/search-location";
import { FilterGuestPage } from "../filter-guest/filter-guest";
import { FlightsPage } from "../flights/flights";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var SearchFlightPage = (function () {
    function SearchFlightPage(nav) {
        this.nav = nav;
        // search condition
        this.search = {
            from: "HAN - Hanoi",
            arrival: new Date().toISOString(),
            to: "DAD - Danang",
            depart: new Date().toISOString(),
            persons: 3
        };
    }
    // choose place
    SearchFlightPage.prototype.choosePlace = function () {
        this.nav.push(SearchLocationPage);
    };
    // choose number of guest
    SearchFlightPage.prototype.chooseGuest = function () {
        this.nav.push(FilterGuestPage);
    };
    // go to result page
    SearchFlightPage.prototype.doSearch = function () {
        this.nav.push(FlightsPage);
    };
    return SearchFlightPage;
}());
SearchFlightPage = __decorate([
    Component({
        selector: 'page-search-flight',
        templateUrl: 'search-flight.html'
    }),
    __metadata("design:paramtypes", [NavController])
], SearchFlightPage);
export { SearchFlightPage };
//# sourceMappingURL=search-flight.js.map