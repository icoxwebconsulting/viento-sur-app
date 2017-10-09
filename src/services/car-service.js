var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { CARS } from "./mock-cars";
var CarService = (function () {
    function CarService() {
        this.cars = CARS;
    }
    CarService.prototype.getAll = function () {
        return this.cars;
    };
    CarService.prototype.getItem = function (id) {
        for (var i = 0; i < this.cars.length; i++) {
            if (this.cars[i].id === parseInt(id)) {
                return this.cars[i];
            }
        }
        return null;
    };
    CarService.prototype.remove = function (item) {
        this.cars.splice(this.cars.indexOf(item), 1);
    };
    return CarService;
}());
CarService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], CarService);
export { CarService };
//# sourceMappingURL=car-service.js.map