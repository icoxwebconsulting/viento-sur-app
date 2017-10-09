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
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { SearchHotelPage } from "../search-hotel/search-hotel";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var WelcomePage = (function () {
    function WelcomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        console.log('WelcomePage');
    };
    // go to register page
    WelcomePage.prototype.register = function () {
        this.navCtrl.setRoot(RegisterPage);
    };
    // login and go to home page
    WelcomePage.prototype.login = function () {
        this.navCtrl.setRoot(HomePage);
    };
    WelcomePage.prototype.searchHotel = function () {
        var _this = this;
        this.navCtrl.setRoot(SearchHotelPage)
            .then(function () {
            var index = _this.navCtrl.getActive().index;
            _this.navCtrl.remove(0, index);
        });
    };
    return WelcomePage;
}());
WelcomePage = __decorate([
    Component({
        selector: 'page-welcome',
        templateUrl: 'welcome.html'
    }),
    __metadata("design:paramtypes", [NavController])
], WelcomePage);
export { WelcomePage };
//# sourceMappingURL=welcome.js.map