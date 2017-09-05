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


}