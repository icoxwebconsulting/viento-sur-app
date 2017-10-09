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
import { CarService } from "../../services/car-service";
import { HomePage } from "../home/home";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var CheckoutCarPage = (function () {
    function CheckoutCarPage(nav, carService, toastCtrl) {
        this.nav = nav;
        this.carService = carService;
        this.toastCtrl = toastCtrl;
        // date from
        this.dateFrom = new Date();
        // date to
        this.dateTo = new Date();
        // set sample data
        this.shop = carService.getItem(1);
        this.car = this.shop.cars[0];
    }
    // process send button
    CheckoutCarPage.prototype.send = function () {
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
    return CheckoutCarPage;
}());
CheckoutCarPage = __decorate([
    Component({
        selector: 'page-checkout-car',
        templateUrl: 'checkout-car.html'
    }),
    __metadata("design:paramtypes", [NavController, CarService, ToastController])
], CheckoutCarPage);
export { CheckoutCarPage };
//# sourceMappingURL=checkout-car.js.map