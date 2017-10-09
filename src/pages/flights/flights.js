var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavController, ActionSheetController } from "ionic-angular";
import { FlightService } from "../../services/flight-service";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var FlightsPage = (function () {
    function FlightsPage(nav, flightService, actionSheetController) {
        this.nav = nav;
        this.flightService = flightService;
        this.actionSheetController = actionSheetController;
        // set sample data
        this.flights = flightService.getAll();
    }
    // go to search page when click search button
    FlightsPage.prototype.goToSearch = function () {
        this.nav.pop();
    };
    // show sort order
    FlightsPage.prototype.sort = function () {
        var actionSheet = this.actionSheetController.create({
            title: 'Sort by',
            buttons: [
                {
                    text: 'Price',
                    handler: function () {
                        // add your code here
                    }
                },
                {
                    text: 'Departure Time',
                    handler: function () {
                        // add your code here
                    }
                },
                {
                    text: 'Arrival Time',
                    handler: function () {
                        // add your code here
                    }
                },
                {
                    text: 'Duration',
                    handler: function () {
                        // add your code here
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // go to checkout page
    FlightsPage.prototype.checkout = function () {
        //this.nav.push(CheckoutFlightPage);
    };
    return FlightsPage;
}());
FlightsPage = __decorate([
    Component({
        selector: 'page-flights',
        templateUrl: 'flights.html'
    }),
    __metadata("design:paramtypes", [NavController, FlightService, ActionSheetController])
], FlightsPage);
export { FlightsPage };
//# sourceMappingURL=flights.js.map