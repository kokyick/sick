import {Component, ViewChild} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {UserService} from "../../services/user-service";
import {StackConfig, ThrowEvent, SwingStackComponent} from 'angular2-swing';
import {UserDetailPage} from "../user-detail/user-detail";
import {NotificationsPage} from "../notifications/notifications";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  stackConfig: StackConfig;

  // list of nearby users
  public users: any;
  // current user
  public currentUser: any;

  constructor(public nav: NavController, public userService: UserService, public app: App) {
    // set sample data
    this.users = userService.getAll();
    this.currentUser = this.users[0];


  }


  ngAfterViewInit() {}

  // This method is called by hooking up the event
  // on the HTML element - see the template above
  onThrowOut(event: ThrowEvent) {
    // console.log('Hook from the template', event.throwDirection);
    let index = event.target.id.replace('card-', '');

    // check for the last user to hide float button
    if ('0' == index) {
      this.users = [];
    } else {
      this.currentUser = this.users[index];
    }
  }

  // destroy card
  destroyCard() {
    this.users.pop();
  }

  // toggle like
  toggleLike() {
    this.currentUser.isLiked = !this.currentUser.isLiked;
  }

  // view user
  viewUser(id) {
    this.app.getRootNav().push(UserDetailPage, {id: id});
  }

  // view notifications
  viewNotifications() {
    this.app.getRootNav().push(NotificationsPage);
  }
}
