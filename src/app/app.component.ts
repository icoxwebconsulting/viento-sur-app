import {Component, ViewChild} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {SearchHotelPage} from  '../pages/search-hotel/search-hotel';

// import pages
// end import pages

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;

  public nav: any;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage = SearchHotelPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


