import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html',
})
export class ModalPage {
    public information = {};

  constructor(private navParams: NavParams, private view: ViewController) {
      this.navParams.get('data')
  }

  ionViewWillLoad() {
    const data = this.navParams.get('data');
    this.information = data;
    console.log(data);
  }

  closeModal() {

    this.view.dismiss();
  }
}
