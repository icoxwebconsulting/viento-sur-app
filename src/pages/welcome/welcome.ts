import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {SearchHotelPage} from "../search-hotel/search-hotel"


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) {

  }

    ionViewDidLoad(){
      console.log('WelcomePage');
    }

  // go to register page
  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    this.navCtrl.setRoot(HomePage);
  }

  searchHotel(){
      this.navCtrl.setRoot(SearchHotelPage)
          .then(() => {
              const index = this.navCtrl.getActive().index;
              this.navCtrl.remove(0, index);
          })
  }

}
