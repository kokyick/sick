import {Component, ViewChild} from '@angular/core';
import {NavController, Content, Platform} from 'ionic-angular';

import {ChatService} from '../../services/chat-service';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})

export class ChatDetailPage {
  @ViewChild(Content) content: Content;

  public chat: any;
  public newMessage: any;

  constructor(public nav: NavController, public chatService: ChatService, public platform: Platform) {
    // get sample data only
    //this.chat = chatService.getItem(navParams.get('id'));
    this.chat = chatService.getItem(0);

    /*
    platform.ready().then(() => {
      let content = this.content;
      // scroll to bottom on keyboard show
      window.addEventListener('native.keyboardshow', function () {
        let dimensions = content.getContentDimensions();
        content.scrollTo(0, dimensions.scrollHeight + dimensions.scrollTop, 0);
      });
    })
    */
  }

  // send message
  sendMessage() {
    if (this.newMessage) {
      this.chat.messages.push({
        type: 'sent',
        text: this.newMessage,
        image: '',
        time: 'Just now'
      });

      // clear input
      this.newMessage = '';

      // scroll to bottom
      setTimeout(() => {
        // scroll to bottom
        this.content.scrollToBottom();
      }, 200)
    }
  }

}
