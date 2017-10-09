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
import { NavController, ToastController } from "ionic-angular";
import { TripService } from "../../services/trip-service";
import { HomePage } from "../home/home";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var CheckoutTripPage = (function () {
    function CheckoutTripPage(nav, tripService, toastCtrl) {
        this.nav = nav;
        this.tripService = tripService;
        this.toastCtrl = toastCtrl;
        // number of adults
        this.adults = 1;
        // date
        this.date = new Date();
        // set sample data
        this.trip = tripService.getItem(1);
    }
    // process send button
    CheckoutTripPage.prototype.send = function () {
        // send booking info
        // show message
        var toast = this.toastCtrl.create({
            message: 'Booking sent',
            duration: 2000,
            position: 'middle'
        });
        toast.present();
        // back to home page
        this.nav.setRoot(HomePage);
    };
    return CheckoutTripPage;
}());
CheckoutTripPage = __decorate([
    Component({
        selector: 'page-checkout-trip',
        templateUrl: 'checkout-trip.html'
    }),
    __metadata("design:paramtypes", [NavController, TripService, ToastController])
], CheckoutTripPage);
export { CheckoutTripPage };
//# sourceMappingURL=checkout-trip.js.map