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
import { TripsPage } from "../trips/trips";
import { SearchLocationPage } from "../search-location/search-location";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var SearchTripsPage = (function () {
    function SearchTripsPage(nav) {
        this.nav = nav;
        // search condition
        this.search = {
            name: "Location",
            date: new Date().toISOString()
        };
    }
    // go to result page
    SearchTripsPage.prototype.doSearch = function () {
        this.nav.push(TripsPage);
    };
    // choose place
    SearchTripsPage.prototype.choosePlace = function () {
        this.nav.push(SearchLocationPage);
    };
    return SearchTripsPage;
}());
SearchTripsPage = __decorate([
    Component({
        selector: 'page-search-trips',
        templateUrl: 'search-trips.html'
    }),
    __metadata("design:paramtypes", [NavController])
], SearchTripsPage);
export { SearchTripsPage };
//# sourceMappingURL=search-trips.js.map