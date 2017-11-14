import {Component} from '@angular/core';
import {Platform, Config} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// import pages
import {MainTabsPage} from '../pages/main-tabs/main-tabs';
import {LoginPage} from '../pages/login/login';
import {ContactsPage} from '../pages/contacts/contacts';
import {SettingPage} from '../pages/setting/setting';
import {TutorialPage} from '../pages/tutorial/tutorial';
// end import pages

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;

  public nav: any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: MainTabsPage
    },

    {
      title: 'Contacts',
      icon: 'ios-home-outline',
      count: 0,
      component: ContactsPage
    },

    {
      title: 'Setting',
      icon: 'ios-home-outline',
      count: 0,
      component: SettingPage
    },

    {
      title: 'Logout',
      icon: 'ios-home-outline',
      count: 0,
      component: LoginPage
    },
    // import menu
  ];

  constructor( private config: Config, private translate: TranslateService, public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage = TutorialPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initTranslate();
  }
  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
