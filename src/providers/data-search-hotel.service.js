var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
var DataSearchHotelService = (function () {
    function DataSearchHotelService(storage) {
        this.storage = storage;
        this.rooms = [];
    }
    DataSearchHotelService.prototype.setRooms = function (room) {
        this.storage.set('rooms', JSON.stringify(room));
    };
    DataSearchHotelService.prototype.getRooms = function () {
        return this.storage.get('rooms');
    };
    DataSearchHotelService.prototype.removeRooms = function () {
        this.storage.remove('rooms');
    };
    DataSearchHotelService.prototype.setDestination = function (destination) {
        this.storage.set('destination', JSON.stringify(destination));
    };
    DataSearchHotelService.prototype.getDestination = function () {
        return this.storage.get('destination');
    };
    DataSearchHotelService.prototype.removeDestination = function () {
        this.storage.remove("destination").then(function () { });
    };
    DataSearchHotelService.prototype.setSearchHotels = function (query) {
        this.storage.set('searchHotel', JSON.stringify(query));
    };
    DataSearchHotelService.prototype.getSearchHotels = function () {
        return this.storage.get('searchHotel');
    };
    DataSearchHotelService.prototype.removeSearchHotels = function () {
        this.storage.remove("searchHotel").then(function () { });
    };
    DataSearchHotelService.prototype.setFacets = function (query) {
        this.storage.set('facets', JSON.stringify(query));
    };
    DataSearchHotelService.prototype.getFacets = function () {
        return this.storage.get('facets');
    };
    DataSearchHotelService.prototype.removeFacets = function () {
        this.storage.remove("facets").then(function () { });
    };
    return DataSearchHotelService;
}());
DataSearchHotelService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage])
], DataSearchHotelService);
export { DataSearchHotelService };
//# sourceMappingURL=data-search-hotel.service.js.map