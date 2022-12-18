import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { fadeIn, fadeInOut } from '../animations';
import { ApiService } from '../../api.service';

const randomMessages = [
  'Nice to meet you',
  'We now support Angular 10!',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'Is there anything else I can help you with?',
  "That's awesome",
  'Angular 10 Elements is the bomb 💣 ',
  'Can you explain in more detail?',
  "Anyway I've gotta go now",
  'It was a pleasure to chat with you',
  'We are happy to make you a custom offer!',
  'Bye',
  ':)',
];

const rand = (max) => Math.floor(Math.random() * max);

const getRandomMessage = () => randomMessages[rand(randomMessages.length)];

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  constructor(public api: ApiService) {}

  @ViewChild('bottom') bottom: ElementRef;
  @Input() public theme: 'blue' | 'grey' = 'blue';

  public _visible = false;

  public get visible() {
    return this._visible;
  }

  @Input() public set visible(visible) {
    this._visible = visible;
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom();
        this.focusMessage();
      }, 0);
    }
  }

  public focus = new Subject();

  public operator = {
    name: 'Operator',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  };

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`,
  };

  public messages = [];

  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    });
    this.scrollToBottom();
  }

  public firstMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    });
    this.scrollToBottom();
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView();
    }
  }

  public focusMessage() {
    this.focus.next(true);
  }

  public randomMessage() {
    this.addMessage(this.operator, getRandomMessage(), 'received');
  }

  ngOnInit() {
    var data = {
      socket_id: '444054.3908808',
      channel_name:
        'presence-insentstaging1-widget-user-RzwL48pTfJoItRp4g1671260252954 ',
    };
    setTimeout(() => (this.visible = true), 1000);
    setTimeout(() => {
      this.addMessage(this.operator, 'Hi, how can we help you?', 'received');
      this.api.getchatbotData(data).subscribe(
        (datum) => {
          JSON.stringify(datum);
          // alert(JSON.stringify(datum));
        },
        (err) => {
          // alert(JSON.stringify(err));
        }
      );
    }, 1500);
  }

  public toggleChat() {
    this.visible = !this.visible;
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return;
    }
    this.addMessage(this.client, message, 'sent');
    setTimeout(() => this.randomMessage(), 1000);
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage();
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat();
    }
  }
}
