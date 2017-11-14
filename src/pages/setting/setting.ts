import {Component} from '@angular/core';
import {App} from 'ionic-angular';
import {LoginPage} from "../login/login";

import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  private translate: TranslateService;
  selectedLanguage:any="en";
  constructor(private app:App, translate: TranslateService) {
    this.translate = translate;
  }
  
  // logout
  logout() {
    this.app.getRootNav().setRoot(LoginPage);
  }
  setLanguage(){
      this.translate.use(this.selectedLanguage);
  }
}
