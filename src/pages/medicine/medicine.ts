import {Component, ViewChild} from '@angular/core';
import {NavController, App, ModalController, AlertController, ToastController} from 'ionic-angular';
import {ChatService} from "../../services/chat-service";
import {ChatDetailPage} from "../chat-detail/chat-detail";
import {NotificationsPage} from "../notifications/notifications";
import {ItemCreatePage} from "../item-create/item-create";

import { Slides } from 'ionic-angular';
//Models
// import { Meds } from '../../Model/Meds';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html',
})
export class MedicinePage {
  @ViewChild(Slides) slides: Slides;
  // public chats;
  public currentItems: any=[];
  mute:any=false;
  nomeds:any=true;
  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, public modalCtrl: ModalController, public nav: NavController, public chatService: ChatService, public app: App) {
   // set sample data
    // this.chats = chatService.getAll();
    this.haveMeds();
  }
  ionViewDidLoad() { 
    this.slides.lockSwipes(true); 
    this.slides.pager=false;
  } 
  //check for items in list
  haveMeds(){
    var self=this;
    if(self.currentItems.length!=0)
      self.nomeds=false;
    else
      self.nomeds=true;
  }
  // view chat detail
  viewChat(id) {
    this.app.getRootNav().push(ChatDetailPage, {id: id});
  }

  // view notifications
  viewNotifications() {
    this.app.getRootNav().push(NotificationsPage);
  }
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    var self=this;
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        item.id=self.currentItems.length;
        if (item.profilePic=="")
          item.profilePic ='assets/img/pills.png';
        self.currentItems.push(item);
        self.haveMeds();
        console.log(item);
      }
    })
    addModal.present();
  }
  deleteItem(id) {
    var self=this;
    let alert = this.alertCtrl.create({
      title: 'Confirm delete?',
      message: 'Why do you want to delete this medicine?',
      buttons: [
        {
          text: 'This medication is not working',
          handler: () => {
            self.currentItems.splice(id,1);
            self.haveMeds();
          }
        },
        {
          text: 'I have recovered',
          handler: () => {
            self.currentItems.splice(id,1);
            self.haveMeds();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }
  notifyRm(id) {
    console.log(id);
    var self=this;
    var msg='Notication disabled for this medication';
    if(self.mute==true){
      msg='Notication enabled for this medication';
      self.mute=false;
    }
    else{
      self.mute=true;
    }
    let toast = this.toastCtrl.create({
      
      message: msg,
      duration: 3000
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  viewMeds(id){

  }
}
