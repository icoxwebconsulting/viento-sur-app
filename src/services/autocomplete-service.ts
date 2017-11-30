import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {GLOBAL} from '../providers/config';

@Injectable()
export class AutocompleteService {
    public url: string;

    constructor(public _http: Http) {
        this.url = GLOBAL.url
    }

    getItems(query: string) {
        return this._http.get(this.url + 'autocomplete/'+ query)
            .map(res => res.json())
            .toPromise();
    }

    getState(query: string) {
        return this._http.get(this.url + 'autocomplete-state/'+ query)
            .map(res => res.json())
            .toPromise();
    }

    getCity(query: string, stateId: any) {
        return this._http.get(this.url + 'autocomplete-city/'+ stateId +'?.json&query='+ query)
            .map(res => res.json())
            .toPromise();
    }

}
