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
import { CarService } from "../../services/car-service";
import { CarDetailPage } from "../car-detail/car-detail";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var CarsPage = (function () {
    function CarsPage(nav, carService) {
        this.nav = nav;
        this.carService = carService;
        // number of days
        this.numDays = 3;
        // set sample data
        this.shops = carService.getAll();
    }
    // view car
    CarsPage.prototype.viewDetail = function (classId) {
        this.nav.push(CarDetailPage, { id: classId });
    };
    return CarsPage;
}());
CarsPage = __decorate([
    Component({
        selector: 'page-cars',
        templateUrl: 'cars.html'
    }),
    __metadata("design:paramtypes", [NavController, CarService])
], CarsPage);
export { CarsPage };
//# sourceMappingURL=cars.js.map