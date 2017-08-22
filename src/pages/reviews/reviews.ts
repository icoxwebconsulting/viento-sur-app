import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {TabReviewsPage} from "../tab-reviews/tab-reviews";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html'
})
export class ReviewsPage {
  // tabs
  public recent: any;
  public favorable: any;
  public critical: any;

  // hotel info
  public hotel: any;

  constructor(public nav: NavController, public hotelService: HotelService) {
    // set tabs
    this.recent = TabReviewsPage;
    this.favorable = TabReviewsPage;
    this.critical = TabReviewsPage;

    // set hotel data
    this.hotel = hotelService.getItem(1);
  }
}
