import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {GLOBAL} from './global';

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

}
