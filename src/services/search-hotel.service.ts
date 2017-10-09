import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {GLOBAL} from '../providers/config';

@Injectable()
export class SearchHotelService {
    public url: string;

    constructor(public http: Http) {
        this.url = GLOBAL.url
    }

    getHotels(query: string) {
        console.log('getHotels query = ', query);
        return this.http.get(this.url + 'hotels/?.json&'+ query)
            .map(res => res.json())
            .toPromise();
    }

    getHotelsAvailabilities(query, offset){
        console.log(query);
        return this.http.get(this.url + 'hotel/availabilities/?.json&'+ query + '&offset='+ offset)
            .map(res => res.json())
            .toPromise();

        /*return this.http.get('assets/hotel-availabilities.json')
            .map(res => res.json())
            .toPromise();*/
    }

}
