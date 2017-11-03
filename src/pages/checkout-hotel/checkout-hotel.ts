import {Component} from "@angular/core";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {HomePage} from "../home/home";
import {DataSearchHotelService} from "../../providers/data-search-hotel.service";
import {SearchHotelService} from "../../services/search-hotel.service";
import {GLOBAL} from '../../providers/config';
import * as moment from "moment";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-checkout-hotel',
    templateUrl: 'checkout-hotel.html'
})
export class CheckoutHotelPage {
    public hotelDetail: any;
    public formBooking: any;
    public selectedPack: any;
    public formChoice: any;
    public localPayme: any;

    public distribution = {
        rooms: 0,
        adults: 0,
        children: 0
    };

    public guestData = [
        {name: '', lastname: '', document_number: ''},
        {name: '', lastname: '', document_number: ''},
        {name: '', lastname: '', document_number: ''},
        {name: '', lastname: '', document_number: ''}
    ];

    public paymentData = {
        card: '',
        card_number: '',
        card_date: '',
        card_code: '',
        card_owner: '',
        document: '',
        expiration: ''
    };

    public state: any;
    public city: any;

    public date = moment();
    public minDate = this.date.format('YYYY-MM');
    public maxDate = moment(this.date).add(10, 'years').format(GLOBAL.dateFormat);

    public finalPrice = {
        taxes_fee: 0,
        discounts: 0,
        nightly_subtotal: 0,
        total_price_per_night: 0,
        total_prices: 0
    };
    public cardList = [];
    public bankList = [];
    public paymentMethods = [];
    public loading;
    public showPayment: boolean = true;

    public showBtn: boolean = false;


    public selectedIndex: number;
    // hotel info
    public hotel: any;
    // room info
    public room: any;
    // number of nights
    public nights = 1;
    // number of guests
    public guests = 2;
    // date from
    public dateFrom = new Date();
    // date to
    public dateTo = new Date();

    public selectOptions:any;

    constructor(public nav: NavController,
                public hotelService: HotelService,
                public toastCtrl: ToastController,
                public dataSearch: DataSearchHotelService,
                public searchHotel: SearchHotelService,
                public loadingCtrl: LoadingController,) {
        // set sample data
        this.hotel = hotelService.getItem(1);
        this.room = this.hotel.rooms[0];
        this.paymentData.expiration = moment(this.minDate).add(1, 'M').format('YYYY-MM')
        // to: moment(this.date).add(1, 'days').format(GLOBAL.dateFormat),

            console.log('this.paymentData.expiration',moment(this.paymentData.expiration).format('YYYY-MM-DD HH:mm:ss') )
        this.selectOptions = {
            title: 'Pizza Toppings',
            subTitle: 'Select your toppings',
            mode: 'md'
        };
    }

    ionViewCanEnter() {
        console.log('CheckoutHotelPage');
        // this.amenitiesIds = [];
        this.initPage();
    }

    initPage() {
        this.loading = this.loadingCtrl.create({
            content: 'Espere...'
        });

        this.loading.present()
            .then(() => {
                this.dataSearch.getHotelBooking()
                    .then((val) =>{
                        this.hotelDetail = JSON.parse(val);
                        console.log('this.hotelDetail', this.hotelDetail);

                        this.distributionDetail(this.hotelDetail.str_distribution);
                        let checkin_date = moment(this.hotelDetail.checkin_date);
                        let checkout_date = moment(this.hotelDetail.checkout_date);
                        this.nights = checkout_date.diff(checkin_date, 'days');
                        let priceDetail = this.hotelDetail.price_detail;
                        this.finalPrice.taxes_fee = priceDetail.fee + priceDetail.taxes;
                        this.finalPrice.nightly_subtotal = priceDetail.nightly_subtotal;
                        this.finalPrice.discounts = priceDetail.discounts;
                        this.finalPrice.total_price_per_night = priceDetail.nightly_subtotal * this.nights;
                        this.finalPrice.total_prices = this.finalPrice.total_price_per_night + this.finalPrice.taxes_fee - this.finalPrice.discounts;
                        this.formBooking = this.hotelDetail.form_booking;

                        this.hotelDetail.checkin_date = checkin_date.locale('es').format('DD MMM')
                        this.hotelDetail.checkout_date = checkout_date.locale('es').format('DD MMM')

                        for(let i = 0; this.formBooking.items.length > i; i++){
                            if (this.hotelDetail.roompack.choice == this.formBooking.items[i].roompack_choice) {
                                this.selectedPack = this.formBooking.items[i];
                            }
                        }
                        this.formChoice = this.formBooking.dictionary.form_choices[this.selectedPack.form_choice];
                        this.localPayme = this.hotelDetail.roompack.payment_methods;

                        let banks = this.hotelDetail.banks;
                        let cards = this.hotelDetail.cards;

                        for (let key in cards) {
                            this.cardList.push({ key: key, value: cards[key] });
                        }
                        for (let key in banks) {
                            this.bankList.push({ key: key, value: banks[key] });
                        }

                        for(let i = 0;this.localPayme.length > i; i++){
                            let cardStr = [];
                            let bankAll = [];
                            for(let j = 0; this.localPayme[i].card_ids.length > j; j++){
                                let splitId = this.localPayme[i].card_ids[j].split('-');
                                let cardName;
                                let bankName;
                                if(splitId[2] != '*'){
                                    for (var h = 0; this.bankList.length > h; h++) {
                                        if (splitId[2] == this.bankList[h].key) {
                                            bankName = this.bankList[h].value;
                                            bankAll.push({key: this.bankList[h].key, name:this.bankList[h].value})
                                        }
                                    }
                                }else{
                                    bankName = '*';
                                }

                                for (var g = 0; this.cardList.length > g; g++) {
                                    if (splitId[1] == this.cardList[g].key) {
                                        cardName = this.cardList[g].value;
                                        cardStr.push({
                                            card: this.localPayme[i].card_ids[j],
                                            cardName: cardName,
                                            codeCard: splitId[1],
                                            bankName: bankName,
                                            codeBank: splitId[2]
                                        });
                                    }
                                }
                            }

                            // console.log('bankAll', bankAll); debugger;

                            let bank = [];

                            bankAll.filter(function (item) {
                               let i = bank.findIndex(x => x.key == item.key);
                               if(i <= -1){
                                   bank.push({key: item.key, name: item.name});
                               }
                            });

                            let amounts = this.localPayme[i].amounts;
                            let choice = this.localPayme[i].choice;
                            let excluded_bins = this.localPayme[i].excluded_bins;
                            let installment_quantity = this.localPayme[i].installment_quantity;
                            let type = this.localPayme[i].type;
                            this.paymentMethods.push({
                                amounts: amounts,
                                banks: bank,
                                card_ids: cardStr,
                                choice: choice,
                                excluded_bins: excluded_bins,
                                installment_quantity: typeof installment_quantity !== 'undefined' ? installment_quantity : '',
                                type: type
                            });

                        }

                        console.log('this.paymentMethods', this.paymentMethods);
                        console.log('this.formChoice', this.formChoice.payment);

                        this.loading.dismiss();
                    })
            })
    }

    distributionDetail(distribution){
        let adults = 0;
        let children = 0;
        let rooms = distribution.split('!');

        for (let i = 0; rooms.length > i; i++) {
            let guests = rooms[i].split('-');
            for (let j = 0; guests.length > j; j++) {
                if (j == 0) {
                    adults = parseInt(guests[j]) + adults;
                }
            }
            children = children + guests.length - 1;
        }
        this.distribution.rooms = rooms.length;
        this.distribution.adults = adults;
        this.distribution.children = children;

    }

    // process send button
    send() {

        console.log('this.guestData', this.guestData)

        // send booking info

        // show message
        /*let toast = this.toastCtrl.create({
            message: 'Booking sent',
            duration: 2000,
            position: 'middle'
        });
        toast.present();*/

        // back to home page
        // this.nav.setRoot(HomePage);
    }

    showItem(index: number){
        this.selectedIndex = index;
    }

    selected(quantity: any, cardName: any, bank: any, interest: any ){
        console.log('quantity', quantity);
        console.log('cardName', cardName);
        console.log('bank', bank);
        console.log('interest', interest);
        if(cardName != ''){
            this.showBtn = true
            this.paymentData.card = cardName + ' '+ bank;
        } else {
            this.showBtn = false
        }
        this.showPayment = !this.showPayment;
    }

}
