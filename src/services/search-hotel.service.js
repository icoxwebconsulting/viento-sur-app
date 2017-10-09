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
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { GLOBAL } from '../providers/config';
var SearchHotelService = (function () {
    function SearchHotelService(http) {
        this.http = http;
        this.url = GLOBAL.url;
    }
    SearchHotelService.prototype.getHotels = function (query) {
        console.log('getHotels query = ', query);
        return this.http.get(this.url + 'hotels/?.json&' + query)
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    SearchHotelService.prototype.getHotelsAvailabilities = function (query, offset) {
        console.log(query);
        return this.http.get(this.url + 'hotel/availabilities/?.json&' + query + '&offset=' + offset)
            .map(function (res) { return res.json(); })
            .toPromise();
        /*return this.http.get('assets/hotel-availabilities.json')
            .map(res => res.json())
            .toPromise();*/
    };
    return SearchHotelService;
}());
SearchHotelService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], SearchHotelService);
export { SearchHotelService };
//# sourceMappingURL=search-hotel.service.js.map