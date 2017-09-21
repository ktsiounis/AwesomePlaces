import { Component } from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import {Camera, Geolocation} from "ionic-native";


@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  onOpenMap(){
    const  modal = this.modalCtrl.create(SetLocationPage, {location: this.location});
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data){
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate(){
    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    });
    loader.present();
    Geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          this.toastCtrl.create({
            message: 'Unable to get your location, please pick it manually!',
            duration: 2500
          }).present();
          console.log(error);
        }
      );
  }

  onTakePhoto(){
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          this.imageUrl = imageData;
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      );
  }

}
