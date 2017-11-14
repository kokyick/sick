import {Component} from '@angular/core';
import {NavController, Platform, MenuController} from 'ionic-angular';
import {MedicinePage} from "../medicine/medicine";
import {ProfilePage} from "../profile/profile";
import {SettingPage} from "../setting/setting";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-main-tabs',
  templateUrl: 'main-tabs.html',
})
export class MainTabsPage {
  // tabs
  public meds: any;
  public setting: any;
  public profile: any;

  // tab color
  public tabColor = 'primary';

  constructor(public nav: NavController, public platform: Platform, public menu: MenuController) {
    // set component for tabs
    this.meds = MedicinePage;
    this.setting = SettingPage;
    this.profile = ProfilePage;

    // disable menu
    this.menu.swipeEnable(false);

    // detect platform for tabs color
    if (platform.is('ios')) {
      this.tabColor = '';
    }
  }
}
