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
import { NavController, Platform } from "ionic-angular";
import { HotelService } from "../../services/hotel-service";
import { ReviewsPage } from "../reviews/reviews";
import { CheckoutHotelPage } from "../checkout-hotel/checkout-hotel";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var HotelDetailPage = (function () {
    function HotelDetailPage(nav, hotelService, platform) {
        this.nav = nav;
        this.hotelService = hotelService;
        this.platform = platform;
        // set sample data
        this.hotel = hotelService.getItem(1);
    }
    HotelDetailPage.prototype.ionViewDidLoad = function () {
        // init map
        this.initializeMap();
    };
    HotelDetailPage.prototype.initializeMap = function () {
        var _this = this;
        var latLng = new google.maps.LatLng(this.hotel.location.lat, this.hotel.location.lon);
        var mapOptions = {
            center: latLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false
        };
        this.map = new google.maps.Map(document.getElementById("map-detail"), mapOptions);
        new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        // refresh map
        setTimeout(function () {
            google.maps.event.trigger(_this.map, 'resize');
        }, 300);
    };
    // view a room
    HotelDetailPage.prototype.viewRoom = function (room) {
        for (var i = 0; i < this.hotel.rooms.length; i++) {
            this.hotel.rooms[i].active = false;
        }
        room.active = true;
    };
    // go to reviews page
    HotelDetailPage.prototype.viewReviews = function () {
        this.nav.push(ReviewsPage);
    };
    // go to checkout page
    HotelDetailPage.prototype.checkout = function () {
        this.nav.push(CheckoutHotelPage);
    };
    return HotelDetailPage;
}());
HotelDetailPage = __decorate([
    Component({
        selector: 'page-hotel-detail',
        templateUrl: 'hotel-detail.html'
    }),
    __metadata("design:paramtypes", [NavController, HotelService, Platform])
], HotelDetailPage);
export { HotelDetailPage };
//# sourceMappingURL=hotel-detail.js.map