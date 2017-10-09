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
import { HotelService } from "../../services/hotel-service";
import { HotelDetailPage } from "../hotel-detail/hotel-detail";
import { SearchHotelPage } from "../search-hotel/search-hotel";
import { SearchFlightPage } from "../search-flight/search-flight";
import { SearchCarsPage } from "../search-cars/search-cars";
import { SearchTripsPage } from "../search-trips/search-trips";
import { HotelPage } from "../hotel/hotel";
import { AccountPage } from "../account/account";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var HomePage = (function () {
    function HomePage(nav, hotelService) {
        this.nav = nav;
        this.hotelService = hotelService;
        // set sample data
        this.hotels = hotelService.getAll();
    }
    // view hotel detail
    HomePage.prototype.viewHotel = function (hotelId) {
        this.nav.push(HotelDetailPage, { id: hotelId });
    };
    // view all hotels
    HomePage.prototype.viewHotels = function () {
        this.nav.push(HotelPage);
    };
    // go to search hotel page
    HomePage.prototype.searchHotel = function () {
        this.nav.push(SearchHotelPage);
    };
    // go to search flight page
    HomePage.prototype.searchFlight = function () {
        this.nav.push(SearchFlightPage);
    };
    // go to search car page
    HomePage.prototype.searchCar = function () {
        this.nav.push(SearchCarsPage);
    };
    // go to search trip page
    HomePage.prototype.searchTrip = function () {
        this.nav.push(SearchTripsPage);
    };
    // to go account page
    HomePage.prototype.goToAccount = function () {
        this.nav.push(AccountPage);
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, HotelService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map