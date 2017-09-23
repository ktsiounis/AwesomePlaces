import { Component } from '@angular/core';
import {ModalController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {PlacesService} from "../../services/places.service";
import {Place} from "../../models/place";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(private placesService: PlacesService, private modalCtrl: ModalController) {}

  ionViewWillEnter(){
    this.places = this.placesService.getPlaces();
  }

  onPlaceLoad(place: Place){
    this.modalCtrl.create(PlacePage, {place: place}).present();
  }

}
