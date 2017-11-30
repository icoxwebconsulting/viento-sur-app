import {Component} from "@angular/core";
import {NavController, Platform, LoadingController, Modal, ModalController, ModalOptions} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {ReviewsPage} from "../reviews/reviews";
import {CheckoutHotelPage} from "../checkout-hotel/checkout-hotel";
import {DataSearchHotelService} from "../../providers/data-search-hotel.service";
import {SearchHotelService} from '../../services/search-hotel.service'
// import * as moment from "moment";


declare var google: any;
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-hotel-detail',
    templateUrl: 'hotel-detail.html'
})
export class HotelDetailPage {
    // hotel info
    public hotel: any;
    public hotelId: any;
    public arraySearch: any[] = [];
    public hotelAvailable = {
        roompacks:[],
        availability_token: '',
        hotel: {
            id: ''
        }
    };
    public hotelDetail = {
        name: '',
        stars: 0,
        location:{
            address:"",
            zipcode:"",
            latitude: 0,
            longitude: 0
        },
        main_picture: {
            url: ''
        },
        pictures:[],
        number_of_rooms:0,
        amenities:[],
        room_types:[{
            id: ''
        }],
        information:{
            es: '',
            en: ''
        }
    };
    public bookingId: string;
    public amenitiesIds = [];
    // Map
    public map: any;
    public loading;

    constructor(public nav: NavController,
                public hotelService: HotelService,
                public platform: Platform,
                private dataSearch: DataSearchHotelService,
                public searchHotel: SearchHotelService,
                public loadingCtrl: LoadingController,
                private modal: ModalController
                ) {
        // set sample data
        this.hotel = hotelService.getItem(1);
    }

    ionViewDidLoad() {
        // init map
        // this.initializeMap();

    }

    ionViewCanEnter(){
        console.log('HotelDetailPage');
        this.amenitiesIds = [];
        this.initPage();
    }

    initPage() {
        this.loading = this.loadingCtrl.create({
            content: 'Espere...'
        })

        this.loading.present()
            .then(() => {
                this.dataSearch.getHotelDetail()
                    .then((val) => {
                    this.arraySearch = JSON.parse(val);
                    console.log('this.arraySearch', this.arraySearch)
                        this.dataHotel();

                    })
            })
    }

    dataHotel(){
        this.hotelId = this.arraySearch[0].hotelId;
        let query = 'country_code=AR' +
            '&checkin_date=' + this.arraySearch[0].checkin_date +
            '&checkout_date=' + this.arraySearch[0].checkout_date +
            '&destination=' + this.arraySearch[0].destination +
            '&distribution=' + this.arraySearch[0].distribution +
            '&language=' + this.arraySearch[0].language +
            '&currency=' + this.arraySearch[0].currency;

        let queryHotels = 'ids='+ this.hotelId + '&language=es';


        this.searchHotel.getHotelsAvailabilitiesId(query, this.hotelId)
            .then(data => {

                this.hotelAvailable = data.data;
                console.log('this.hotelAvailable', this.hotelAvailable);

                this.searchHotel.getHotels(queryHotels)
                    .then(hotelDetail => {
                        this.hotelDetail = hotelDetail.data[this.hotelId];
                        // this.hotelDetail.push(hotelDetail.data[this.hotelId]);

                        console.log('this.hotelDetail', this.hotelDetail);

                        for(let i = 0; this.hotelDetail.amenities.length > i; i++){
                            let id = this.hotelDetail.amenities[i].id;
                            if(id == 'INGRAH' ){
                                let services = {icon: 'wifi',name: 'WI-FI'};
                                this.amenitiesIds.push(services);
                            }else if(id == 'AIR'){
                                let services = {icon: 'snow',name: 'Aire'};
                                this.amenitiesIds.push(services);
                            }else if(id == 'BAG'){
                                let services = {icon: 'briefcase',name: 'Maletero'};
                                this.amenitiesIds.push(services);
                            }else if(id == 'BSNSC'){
                                let services = {icon: 'people',name: 'Negocios'};
                                this.amenitiesIds.push(services);
                            }else if(id == 'ELEV'){
                                let services = {icon: 'ios-checkmark-circle-outline',name: 'Ascensor'};
                                this.amenitiesIds.push(services);
                            }else if(id == 'GIM'){
                                let services = {icon: 'ios-checkmark-circle-outline',name: 'Gimnasio'};
                                this.amenitiesIds.push(services);
                            }else if(id == 'HOT'){
                                let services = {icon: 'flame',name: 'Calefaccion'};
                                this.amenitiesIds.push(services);
                            }else if(id == 'LASESU'){
                                let services = {icon: 'ios-checkmark-circle-outline',name: 'Lavanderia'};
                                this.amenitiesIds.push(services);
                            }else if(id == 'MEETROOM'){
                                let services = {icon: 'easel',name: 'Reuniones'};
                                this.amenitiesIds.push(services);
                            }else if(id == 'OUSWPOSE'){
                                let services = {icon: 'ios-checkmark-circle-outline',name: 'Piscina'};
                                this.amenitiesIds.push(services);
                            }
                        }
                        this.initializeMap();

                        this.loading.dismiss();

                    })
            })

    }

    initializeMap() {
        let latLng = new google.maps.LatLng(this.hotelDetail.location.latitude, this.hotelDetail.location.longitude);

        let mapOptions = {
            center: latLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false
        }

        this.map = new google.maps.Map(document.getElementById("map-detail"), mapOptions);
        new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

        // refresh map
        setTimeout(() => {
            google.maps.event.trigger(this.map, 'resize');
        }, 300);
    }

    // view a room
    viewRoom(room) {
        for (let i = 0; i < this.hotel.rooms.length; i++) {
            this.hotel.rooms[i].active = false;
        }

        room.active = true;
    }

    // go to reviews page
    viewReviews() {
        this.nav.push(ReviewsPage);
    }

    // go to checkout page
    checkout(roompack, priceDetail, room_name) {
        let query = {
            country_code: 'AR',
            context_language: this.arraySearch[0].language,
            availability_token: this.hotelAvailable.availability_token
        };

        this.loading = this.loadingCtrl.create({
            content: 'Espere...'
        });
        this.loading.present()
            .then(() => {
                this.searchHotel.postHotelBooking(query)
                    .then(data => {
                        console.log('query', query);
                        // guardar los datos necesarios en el localstorage
                        console.log('data', data)
                        this.bookingId = data.data.id;

                        this.searchHotel.getHotelBooking(this.bookingId)
                            .then(res => {

                                this.searchHotel.getCards()
                                    .then(cards => {

                                        this.searchHotel.getBanks()
                                            .then(banks => {

                                                let saveData = {
                                                    hotel_id: this.hotelId,
                                                    hotel_img: this.hotelDetail.main_picture.url,
                                                    hotel_name: this.hotelDetail.name,
                                                    hotel_address: this.hotelDetail.location.address,
                                                    hotel_stars: this.hotelDetail.stars,
                                                    room_name: room_name,
                                                    checkin_date: this.arraySearch[0].checkin_date,
                                                    checkout_date: this.arraySearch[0].checkout_date,
                                                    str_distribution: this.arraySearch[0].distribution,
                                                    booking_id: this.bookingId,
                                                    price_detail: roompack.price_detail,
                                                    roompack: roompack,
                                                    room_cancellation: roompack.cancellation_policy.text,
                                                    availability_token: this.hotelAvailable.availability_token,
                                                    cards: cards.data,
                                                    banks: banks.data,
                                                    form_booking: res.data
                                                };

                                                this.dataSearch.setHotelBooking(saveData);

                                                this.loading.dismiss();
                                                this.nav.push(CheckoutHotelPage);

                                            })

                                    })


                            })

                    })

            })

        // console.log('this.hotelAvailable.hotel.id', this.hotelAvailable.hotel.id);
        // this.nav.push(CheckoutHotelPage);
    }

    openModal() {
        const myModalOptions: ModalOptions = {
            enableBackdropDismiss: false
        };

        const myModalData = {
            info: this.hotelDetail.information.es
        };

        const myModal: Modal = this.modal.create('ModalPage', { data: myModalData }, myModalOptions);

        myModal.present();

        myModal.onDidDismiss((data) => {
            console.log(data);
        });

        myModal.onWillDismiss((data) => {
            console.log(data);
        });

    }

    range(number){
        var items: number[] = [];
        for(var i = 1; i <= number; i++){
            items.push(i);
        }
        return items;
    }
}
