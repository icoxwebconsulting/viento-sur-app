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
import { NavController, App } from "ionic-angular";
import { HotelService } from "../../services/hotel-service";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var TabReviewsPage = (function () {
    function TabReviewsPage(nav, hotelService, app) {
        this.nav = nav;
        this.hotelService = hotelService;
        this.app = app;
        // list of reviews
        this.reviews = [];
        // set hotel data
        this.hotel = hotelService.getItem(1);
        // filter reviews
        var tabId = this.nav.id;
        for (var i = 0; i < this.hotel.reviews.length; i++) {
            // if is recent tab
            if (tabId == 't0-0') {
                this.reviews.push(this.hotel.reviews[i]);
            }
            else if (tabId == 't0-1') {
                if (this.hotel.reviews[i].rating > 3) {
                    this.reviews.push(this.hotel.reviews[i]);
                }
            }
            else {
                if (this.hotel.reviews[i].rating <= 3) {
                    this.reviews.push(this.hotel.reviews[i]);
                }
            }
        }
    }
    // make array with range is n
    TabReviewsPage.prototype.range = function (n) {
        return new Array(n);
    };
    // dismiss
    TabReviewsPage.prototype.dismiss = function () {
        this.app.getRootNav().pop();
    };
    return TabReviewsPage;
}());
TabReviewsPage = __decorate([
    Component({
        selector: 'page-tab-reviews',
        templateUrl: 'tab-reviews.html'
    }),
    __metadata("design:paramtypes", [NavController, HotelService, App])
], TabReviewsPage);
export { TabReviewsPage };
//# sourceMappingURL=tab-reviews.js.map