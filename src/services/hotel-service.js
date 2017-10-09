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
import { HOTELS } from "./mock-hotels";
var HotelService = (function () {
    function HotelService() {
        this.hotels = HOTELS;
    }
    HotelService.prototype.getAll = function () {
        return this.hotels;
    };
    HotelService.prototype.getItem = function (id) {
        for (var i = 0; i < this.hotels.length; i++) {
            if (this.hotels[i].id === parseInt(id)) {
                return this.hotels[i];
            }
        }
        return null;
    };
    HotelService.prototype.remove = function (item) {
        this.hotels.splice(this.hotels.indexOf(item), 1);
    };
    return HotelService;
}());
HotelService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], HotelService);
export { HotelService };
//# sourceMappingURL=hotel-service.js.map