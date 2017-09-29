import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FilterHotelPage} from "../filter-hotel/filter-hotel";

/**
 * Generated class for the FilterHotelPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-filter-hotel-popover',
  templateUrl: 'filter-hotel-popover.html',
})
export class FilterHotelPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterHotelPopoverPage');
  }


  goToFilters(){
      this.navCtrl.push(FilterHotelPage);
  }

}
