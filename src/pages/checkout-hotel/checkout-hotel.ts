import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {LoadingController, NavController, AlertController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {HomePage} from "../home/home";
import {DataSearchHotelService} from "../../providers/data-search-hotel.service";
import {SearchHotelService} from "../../services/search-hotel.service";
import {AutocompleteService} from '../../services/autocomplete-service';
import {GLOBAL} from '../../providers/config';
import {Cards} from '../../providers/credit-card'
import {Countries} from '../../providers/countries'
import * as moment from "moment";

@Component({
    selector: 'page-checkout-hotel',
    templateUrl: 'checkout-hotel.html'
})
export class CheckoutHotelPage {
    formPayment: FormGroup;
    public cityActive = true;
    public stateActive = true;
    public maxlength: any;
    public hotelDetail: any;
    public formBooking: any;
    public selectedPack: any;
    public formChoice: any;
    public localPayme: any;
    public card_check = false;
    public error = {
        message: '',
        card_number: false,
        email: false,
        email_confirm: false,
        first_name: false,
        last_name: false,
        document_number: false
    };

    public distribution = {
        rooms: 0,
        adults: 0,
        children: 0
    };

    public guestData = [
        {first_name: '', last_name: '', document_number: ''},
        {first_name: '', last_name: '', document_number: ''},
        {first_name: '', last_name: '', document_number: ''},
        {first_name: '', last_name: '', document_number: ''}
    ];

    public paymentData = {
        card: '',
        bank: '',
        paymentMethod: '',
        number: '',
        expiration: '',
        security_code: '',
        owner_name: '',
        owner_documenttype: '',
        owner_documentnumber: '',
        owner_gender: '',
        bank_code: '',
        card_code: '',
        card_type: '',
        invoice_name: '',
        fiscal_document: '',
        tax_status: '',
        billing_addresscountry: '',
        billing_addressstreet: '',
        billing_addressnumber: '',
        billing_addressfloor: '',
        billing_addressdepartment: '',
        billing_addressstate_id: '',
        billing_addresscity_id: '',
        billing_addresspostal_code: '',
        type0: '',
        number0: '',
        country_code0: '54',
        area_code0: '',
        email: '',
        email_confirm: '',
        vouchers: '',
        comment: '',
        should_use_nightly_prices: 0,
        checkin_date: '',
        checkout_date: ''

    };

    public searchingState: any = false;
    public searchingCity: any = false;
    public cities: any[] = [];
    public states: any[] = [];
    public queryState: string;
    public queryCity: string;
    public disabledCity: any = true;
    public passengers: any;

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
    public card_valid = Cards;
    public countries = Countries;

    public selectedIndex: number;
    // hotel info
    public hotel: any;
    // room info
    public room: any;
    // number of nights
    public nights = 1;
    // number of guests
    public guests = 2;

    constructor(public nav: NavController,
                public hotelService: HotelService,
                public autocompleteService: AutocompleteService,
                public dataSearch: DataSearchHotelService,
                public searchHotel: SearchHotelService,
                public formBuilder: FormBuilder,
                public loadingCtrl: LoadingController,
                private alertCtrl: AlertController) {
        // set sample data
        this.paymentData.type0 = 'CELULAR';
        this.hotel = hotelService.getItem(1);
        this.room = this.hotel.rooms[0];
        this.paymentData.expiration = moment(this.minDate).add(1, 'M').format('YYYY-MM');
        this.formPayment = formBuilder.group({
            first_name0: [''], last_name0: [''], document_number0: [''],
            first_name1: [''], last_name1: [''], document_number1: [''],
            first_name2: [''], last_name2: [''], document_number2: [''],
            first_name3: [''], last_name3: [''], document_number3: [''],
            card_selected: [{ value: this.paymentData.bank +' '+ this.paymentData.card, disabled: true }],
            number: [''], expiration: [''], security_code: [''],
            owner_name: [''], owner_documenttype: [''], owner_documentnumber: [''], owner_gender: [''],
            invoice_name: [''], fiscal_document: [''], tax_status: [''],
            billing_addressstreet: [''], billing_addressnumber: [''], billing_addressfloor: [''],
            billing_addressdepartment: [''], billing_addresspostal_code: [''], billing_addresscountry: [''],
            billing_addressstate_id: [''], billing_addresscity_id: [''],
            type0: [''], number0: [''], country_code0: [''], area_code0: [''],
            email: [''], email_confirm: [''], vouchers: [''], comment: [''],
        });

        // to: moment(this.date).add(1, 'days').format(GLOBAL.dateFormat),
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
                    .then((val) => {
                        this.hotelDetail = JSON.parse(val);

                        this.distributionDetail(this.hotelDetail.str_distribution);
                        let checkin_date = moment(this.hotelDetail.checkin_date);
                        let checkout_date = moment(this.hotelDetail.checkout_date);
                        this.paymentData.checkin_date = moment(this.hotelDetail.checkin_date).format('DD/MM/YYYY');
                        this.paymentData.checkout_date = moment(this.hotelDetail.checkout_date).format('DD/MM/YYYY');
                        this.nights = checkout_date.diff(checkin_date, 'days');
                        let priceDetail = this.hotelDetail.price_detail;
                        this.finalPrice.taxes_fee = priceDetail.fee + priceDetail.taxes;
                        this.finalPrice.nightly_subtotal = priceDetail.nightly_subtotal;
                        this.finalPrice.discounts = priceDetail.discounts;
                        this.finalPrice.total_price_per_night = priceDetail.nightly_subtotal * this.nights;
                        this.finalPrice.total_prices = this.finalPrice.total_price_per_night + this.finalPrice.taxes_fee - this.finalPrice.discounts;
                        this.formBooking = this.hotelDetail.form_booking;

                        this.hotelDetail.checkin_date = checkin_date.locale('es').format('DD MMM');
                        this.hotelDetail.checkout_date = checkout_date.locale('es').format('DD MMM');

                        for(let i = 0; this.formBooking.items.length > i; i++){
                            if (this.hotelDetail.roompack.choice == this.formBooking.items[i].roompack_choice) {
                                this.selectedPack = this.formBooking.items[i];
                            }
                        }
                        this.formChoice = this.formBooking.dictionary.form_choices[this.selectedPack.form_choice];
                        this.localPayme = this.hotelDetail.roompack.payment_methods;

                        this.passengers = this.formChoice.passengers.length;


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
                            if(undefined !== this.localPayme[i].card_ids){
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
                            }

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

                        if( typeof this.formChoice.payment.invoice != 'undefined'){
                            this.paymentData.tax_status = "FINAL_CONSUMER";
                        }else{
                            this.paymentData.tax_status = "";
                        }

                        if( typeof this.formChoice.payment.credit_card.owner_gender != 'undefined'){
                            this.paymentData.owner_gender = "M";
                        }else{
                            this.paymentData.owner_gender = "";
                        }

                        console.log('owner_documenttype', typeof(this.formChoice.payment.credit_card.owner_documenttype))
                        if( typeof(this.formChoice.payment.credit_card.owner_documenttype) != "undefined"){
                            this.paymentData.owner_documenttype = "LOCAL";
                        }else{
                            this.paymentData.owner_documenttype = "";
                        }
                        console.log('this.paymentData.owner_documenttype', this.paymentData.owner_documenttype)

                        // console.log('formChoice', this.formChoice);
                        console.log('this.hotelDetail', this.hotelDetail);
                        console.log('', );

                        if(this.formChoice.additional_data.should_use_nightly_prices){
                            this.paymentData.should_use_nightly_prices = 1;
                        }

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

    showItem(index: number){
        this.selectedIndex = index;
    }

    doAlert(message) {
        this.alertCtrl.create()
            .setTitle('Alert')
            .setMessage(message)
            .addButton('OK')
            .present();
    }

    selected(quantity: any, paymentMethod:any, bank_code:any, cardName: any, bank: any, interest: any ){
        let splitBank = bank_code.split('-');
        console.log('paymentData', this.paymentData);
        this.paymentData.number = '';

        this.paymentData.paymentMethod = paymentMethod;
        if(cardName != ''){
            this.showBtn = true;
            this.paymentData.card = cardName;
            this.paymentData.bank = bank;
            this.paymentData.bank_code = bank_code;
            this.paymentData.card_code = splitBank[1];
            this.paymentData.card_type = splitBank[3];
        } else {
            this.showBtn = false
        }
        this.showPayment = !this.showPayment;
    }

    cardValid(){
        let inputCard = this.paymentData.number;
        let cardNumber;
        let cardSelected;
        let arrLength;
        let minLength;
        let maxLength;
        let arrPrefix;

        if(this.paymentData.number == ''){
            this.error.card_number = true;
            this.error.message = 'No ha proporcionado un número de tarjeta.'
        }else {
            if(GLOBAL.letterPattern.test(this.paymentData.number)){
                this.error.card_number = true;
                this.error.message = 'No debe de tener letras.'
            }else {
                cardNumber = inputCard.match(GLOBAL.numberPattern).join('');

                if(cardNumber.length >= 12){
                    for(let i = 0; this.card_valid.length > i; i++){
                        if(this.card_valid[i].name == this.paymentData.card){
                            cardSelected = this.card_valid[i];
                            if(GLOBAL.commanPattern.test(cardSelected.length)){
                                arrLength = cardSelected.length.split(',');
                                minLength = arrLength[0];
                                maxLength = arrLength[arrLength.length -1];
                                if(minLength <= cardNumber.length && maxLength >= cardNumber.length){
                                    if(GLOBAL.commanPattern.test(cardSelected.prefixes)){
                                        arrPrefix = cardSelected.prefixes.split(',');

                                        for(let j = 0; arrPrefix.length > j; j++){
                                            let lengthPref = arrPrefix[j].length;
                                            if(arrPrefix[j] == cardNumber.substring(0, lengthPref)){
                                                this.card_check = true;
                                                this.error.card_number = false;
                                                this.error.message = 'El número de la tarjeta es inválido.'
                                            }else{
                                                this.error.card_number = true;
                                                this.error.message = 'El número de la tarjeta es inválido.'
                                            }
                                        }
                                    }else{
                                        let lengthPref = cardSelected.prefixes.length;
                                        if(cardSelected.prefixes == cardNumber.substring(0, lengthPref)){
                                            this.error.card_number = false;
                                            this.error.message = 'El número de la tarjeta es inválido.'
                                        }else{
                                            this.error.card_number = true;
                                            this.error.message = 'El número de la tarjeta es inválido.'
                                        }
                                    }

                                }else{
                                    console.log('error rango')
                                }
                            }else {
                                if(GLOBAL.commanPattern.test(cardSelected.prefixes)){
                                    arrPrefix = cardSelected.prefixes.split(',');
                                    for(let j = 0; arrPrefix.length > j; j++){
                                        let lengthPref = arrPrefix[j].length;
                                        if(arrPrefix[j] == cardNumber.substring(0, lengthPref)){
                                            this.error.card_number = false;
                                            this.error.message = 'El número de la tarjeta es válido.'
                                            break;
                                        }else{
                                            this.error.card_number = true;
                                            this.error.message = 'El número de la tarjeta es inválido.'
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }

        }
    }

    emailValid(){
        if(GLOBAL.emailPattern.test(this.paymentData.email)){
            this.error.email = false;
            if(this.paymentData.email_confirm != ''){
                if(this.paymentData.email == this.paymentData.email_confirm){
                    this.error.email = false;
                }else{
                    this.error.email = true;
                    this.error.message = 'Las direcciones de email no coinciden.';
                }
            }
        }else {
            this.error.email = true;
            this.error.message = 'El email tiene un formato inválido.';
        }

    }

    autocomplete(query:string, element: any){
        if(element == 'state' && typeof query != 'undefined'){
            this.queryCity = '';
            this.cities = [];
            if(query.length > 3 && this.stateActive == true){
                this.autocompleteService.getState(query)
                    .then(data => {
                        if (data.code == 200) {
                            this.searchingState = false;
                            this.states = data.data;
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }else{
                this.states = [];
            }
        }else if(element == 'city' && this.paymentData.billing_addressstate_id != ''){
            let id = this.paymentData.billing_addressstate_id;
            if(query.length > 3 && this.cityActive == true){
                this.autocompleteService.getCity(query, id)
                    .then(data => {
                        if (data.code == 200) {
                            this.searchingCity = false;
                            this.cities = data.data;
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }else{
                this.cities = [];
            }
        }

    }

    onSearch(element: string){
        this.stateActive = true;
        this.cityActive = true;
        if(element == 'state'){
            if(this.queryState != null){
                if(this.queryState.length < 4){
                    this.searchingState = false;
                }else {
                    this.searchingState = true;
                }
            }
        }else if(element == 'city' && this.paymentData.billing_addressstate_id != ''){
            if(this.queryCity != null){
                if(this.queryCity.length < 4){
                    this.searchingCity = false;
                }else {
                    this.searchingCity = true;
                }
            }
        }

    }

    itemSelected(item:any, element: any){
        if(element == 'state'){
            this.stateActive = false;
            this.queryState = item.description;
            this.paymentData.billing_addressstate_id = item.item.id;
            this.disabledCity = false;
            this.states = [];
        }else {
            this.cityActive = false;
            this.queryCity = item.description;
            this.paymentData.billing_addresscity_id = item.item.id;
            this.cities = [];
        }
    }

    // process send button
    send() {
        if(this.passengers > 0){
            let item = '';
            for(let i = 0; this.passengers > i; i++){
                if(this.guestData[i].first_name == ''){
                    item = 'Nombre';
                    this.error.first_name = true;

                }else {
                    this.error.first_name = false;
                }
                this.error.message = item+' del titular.';
            }
        }

        let query = {
            hotel_availabilitiesId: this.hotelDetail.hotel_id,
            price_detail: this.hotelDetail.price_detail,
            payment_method: this.paymentData.paymentMethod,
            booking_id: this.hotelDetail.booking_id,
            number_card: this.paymentData.number,
            expiration: this.paymentData.expiration,
            security_code: this.paymentData.security_code,
            owner_name: this.paymentData.owner_name,
            owner_documenttype: this.paymentData.owner_documenttype,
            owner_documentnumber: this.paymentData.owner_documentnumber,
            owner_gender: this.paymentData.owner_gender,
            bank_code: this.paymentData.bank_code,
            card_code: this.paymentData.card_code,
            card_type: this.paymentData.card_type,
            card: this.paymentData.card,
            tax_status: this.paymentData.tax_status,
            invoice_name: this.paymentData.invoice_name,
            fiscal_document: this.paymentData.fiscal_document,
            billing_addressstreet: this.paymentData.billing_addressstreet,
            billing_addressnumber: this.paymentData.billing_addressnumber,
            billing_addressfloor: this.paymentData.billing_addressfloor,
            billing_addressdepartment: this.paymentData.billing_addressdepartment,
            billing_addressstate_id: this.paymentData.billing_addressstate_id,
            billing_addresscity_id: this.paymentData.billing_addresscity_id,
            billing_addresspostal_code: this.paymentData.billing_addresspostal_code,
            passengers: this.guestData,
            email: this.paymentData.email,
            type0: this.paymentData.type0,
            number0: this.paymentData.number0,
            country_code0: this.paymentData.country_code0,
            area_code0: this.paymentData.area_code0,
            comment: this.paymentData.comment,
            should_use_nightly_prices: this.paymentData.should_use_nightly_prices,
            checkin_date: this.paymentData.checkin_date,
            checkout_date: this.paymentData.checkout_date,
            tokenize_key: this.formBooking.tokenize_key,
            vouchers: this.paymentData.vouchers,
            lang: 'es',
            currency: 'ARS',
            selected_pack: this.selectedPack,
            cancellation_status: this.hotelDetail.roompack.cancellation_policy.status,
            name_hotel: this.hotelDetail.hotel_name
        };
        console.log('query',  query);

        this.loading = this.loadingCtrl.create({
            content: 'Espere...'
        });

        this.loading.present()
            .then(() => {
                this.searchHotel.patchHotelBooking(query)
                    .then(data => {
                        console.log('patchHotelBooking', data);
                        this.loading.dismiss();

                        // back to home page
                        // this.nav.setRoot(HomePage);
                    })
                    .catch(error => {
                        console.error(error);
                        this.loading.dismiss();
                        this.doAlert(error);
                    })

            });

    }

}
