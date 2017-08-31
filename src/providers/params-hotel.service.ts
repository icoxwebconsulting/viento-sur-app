import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()

export class ParamsHotelService{


    constructor(private storage: Storage){}

    setGuests(data){
        this.storage.set('room', JSON.stringify(data));
    }

    getGuests() {
        return this.storage.get('room');
    }



}