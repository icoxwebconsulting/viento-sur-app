import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {DataSearchHotelService} from '../../providers/data-search-hotel.service';
import {SearchHotelPage} from '../search-hotel/search-hotel';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-filter-guest',
    templateUrl: 'filter-guest.html'
})
export class FilterGuestPage {

    public roomsArray: any[] = [];

    public room = {room: null, persons: null, adults: null, children: null};

    public roomNum: null;

    // number of adults
    public adults = this.room.adults;

    // number of children
    public children = 0;

    public minors: any[] = [];

    public age = 0;

    constructor(public nav: NavController,
                public navParams: NavParams,
                private dataSearch: DataSearchHotelService) {
    }

    ionViewDidLoad() {
        this.roomNum = this.navParams.get('roomNum');
        this.initPage(this.roomNum);
    }

    // minus adult when click minus button
    minusAdult() {
        this.room.adults--;
    }

    // plus adult when click plus button
    plusAdult() {
        this.room.adults++;
    }

    // minus children when click minus button
    minusChildren() {
        this.room.children--;
        this.minors.pop();

    }

    // plus children when click plus button
    plusChildren() {
        this.room.children++;
        this.minors.push({minor: this.room.children, age: 0});
    }

    plusAge(data) {
        // this.age++;
        for (let i = 0; this.minors.length > i; i++) {
            if (this.minors[i].minor == data.minor && data.age < 18) {
                let editData = {minor: data.minor, age: data.age + 1};
                this.minors[i] = editData;
            }
        }

    }

    minusAge(data) {
        // this.age++;
        for (let i = 0; this.minors.length > i; i++) {
            if (this.minors[i].minor == data.minor && data.age < 18) {
                let editData = {minor: data.minor, age: data.age - 1};
                this.minors[i] = editData;
            }
        }

    }

    // go to search hotel page
    goToSearch() {
        this.nav.pop();
    }

    initPage(roomNum) {
        this.dataSearch.getRooms().then((val) => {
            this.roomsArray = JSON.parse(val);
            let minors;
            for (let i = 0; this.roomsArray.length > i; i++) {

                if (this.roomsArray[i].room == roomNum) {
                    this.room = this.roomsArray[i]
                    if(this.roomsArray[i].children > 0){
                        // if(this.roomsArray[i].age != nu)
                        minors = this.roomsArray[i].age.split('-');
                    }
                }
            }

            if (minors != null){
                for(let i = 0; minors.length > i; i++){
                    this.minors.push({minor: (i + 1), age: parseInt(minors[i])})
                }
            }

        });
    }

    setGuests() {
        let children = [];
        let strChildren;
        if (this.minors.length > 0) {
            for (let i = 0; this.minors.length > i; i++) {
                children.push(this.minors[i].age);
            }

            strChildren = children.join("-");

        }

        for (let i = 0; this.roomsArray.length > i; i++) {
            if (this.roomsArray[i].room == this.roomNum) {
                let guests;

                if ( strChildren == null){
                    guests = this.room.adults
                }else {
                    guests = this.room.adults + '-' + strChildren
                }

                let room = {
                    room: this.roomNum,
                    persons: this.room.adults + this.room.children,
                    adults: this.room.adults,
                    children: this.room.children,
                    age: strChildren,
                    guests: guests
                };

                this.roomsArray[i] = room;
            }
        }

        this.dataSearch.setRooms(this.roomsArray);


        this.nav.push(SearchHotelPage);
    }

    getRoom(id) {

    }

}
