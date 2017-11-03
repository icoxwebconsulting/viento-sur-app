import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable()
export class DataSearchHotelService {
    public paramsHotels: any;

    public rooms = [];

    constructor(private storage: Storage) {
    }

    setRooms(room: any) {
        this.storage.set('rooms', JSON.stringify(room));
    }

    getRooms() {
        return this.storage.get('rooms');
    }

    removeRooms() {
        this.storage.remove('rooms');
    }

    setDestination(destination: any) {
        this.storage.set('destination', JSON.stringify(destination));
    }

    getDestination() {
        return this.storage.get('destination');
    }

    removeDestination() {
        this.storage.remove("destination").then(() => {});
    }

    setSearchHotels(query){
        this.storage.set('searchHotel', JSON.stringify(query));
    }

    getSearchHotels() {
        return this.storage.get('searchHotel');
    }

    removeSearchHotels() {
        this.storage.remove("searchHotel").then(() => {});
    }

    setFacets(query){
        this.storage.set('facets', JSON.stringify(query));
    }

    getFacets() {
        return this.storage.get('facets');
    }

    removeFacets() {
        this.storage.remove("facets").then(() => {});
    }

    setHotelDetail(query){
        this.storage.set('hotelDetail', JSON.stringify(query));
    }

    getHotelDetail() {
        return this.storage.get('hotelDetail');
    }

    removeHotelDetail() {
        this.storage.remove("hotelDetail").then(() => {});
    }

    setHotelBooking(query){
        this.storage.set('hotelBooking', JSON.stringify(query));
    }

    getHotelBooking() {
        return this.storage.get('hotelBooking');
    }

    removeHotelBooking() {
        this.storage.remove("hotelBooking").then(() => {});
    }

}
