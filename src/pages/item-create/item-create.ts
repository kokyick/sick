import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
// import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  frequency:any;

  name:any="";
  about:any="";
  days=[];
  day:any;

  scanData : any;
  options :BarcodeScannerOptions;

  constructor(private barcodeScanner: BarcodeScanner,private localNotifications: LocalNotifications, public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: [''],
      days: ['', Validators.required],
      frequency: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    for(var i=1;i<30;i++){
      this.days.push(i);
    }
  }
  setNotification(){
    // Schedule delayed notification
    let notification = {
      id: 1,
      title: 'Time to eat your meds!',
      text: 'It will be good for your headaches',
      at: new Date(new Date().getTime() + 3600),
      every: 'day',
      badge:1
    };             
    this.localNotifications.schedule(notification);                  
    
  }

  getQRScanner(){
    var self=this;
    this.options = {
      prompt : "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
        self.scanData = barcodeData;
        var data=self.scanData.text.split(",");
        self.name=data[0];
        self.about=data[1];
        self.day=data[2];
        self.frequency=data[3];
    }, (err) => {
        console.log("Error occured : " + err);
    });    
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.setNotification();
    this.viewCtrl.dismiss(this.form.value);
  }
}
