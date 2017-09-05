import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {GLOBAL} from '../providers/config';

@Injectable()
export class SearchHotelService {
    public url: string;

    constructor(public _http: Http) {
        this.url = GLOBAL.url
    }

    getHotels(query: string) {
        console.log('query', query);

        return this._http.get(this.url + 'hotel/availabilities/?.json&'+ query)
            .map(res => res.json())
            .toPromise();
    }

}
