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
import { FLIGHTS } from "./mock-flights";
var FlightService = (function () {
    function FlightService() {
        this.flights = FLIGHTS;
    }
    FlightService.prototype.getAll = function () {
        return this.flights;
    };
    FlightService.prototype.getItem = function (id) {
        for (var i = 0; i < this.flights.length; i++) {
            if (this.flights[i].id === parseInt(id)) {
                return this.flights[i];
            }
        }
        return null;
    };
    FlightService.prototype.remove = function (item) {
        this.flights.splice(this.flights.indexOf(item), 1);
    };
    return FlightService;
}());
FlightService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], FlightService);
export { FlightService };
//# sourceMappingURL=flight-service.js.map