import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {HotelDetailPage} from "../hotel-detail/hotel-detail";
import {SearchHotelPage} from "../search-hotel/search-hotel";
import {HotelPage} from "../hotel/hotel";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // list of hotels
  public hotels: any;

  constructor(public nav: NavController, public hotelService: HotelService) {
    // set sample data
    this.hotels = hotelService.getAll();
  }

  // view hotel detail
  viewHotel(hotelId) {
    this.nav.push(HotelDetailPage, {id: hotelId});
  }

  // view all hotels
  viewHotels() {
    this.nav.push(HotelPage);
  }

  // go to search hotel page
  searchHotel() {
    this.nav.push(SearchHotelPage);
  }
}
