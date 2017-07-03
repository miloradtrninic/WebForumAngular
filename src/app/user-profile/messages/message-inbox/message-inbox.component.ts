import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../model/message.model';

@Component({
  selector: 'app-message-inbox',
  templateUrl: './message-inbox.component.html',
  styleUrls: ['./message-inbox.component.css']
})
export class MessageInboxComponent implements OnInit {
  inboxMsg: Message[];
  errormsg: string;
  toRead: any = new Object();
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getInbox().subscribe(
      (inboxMsg) => this.inboxMsg = inboxMsg,
      (error) => this.errormsg = error
    );
  }

  readMessaage(message: Message, index: number) {
    if (this.toRead.id == index) {
      this.toRead.id = -1;
    } else{
      this.toRead.id = index;
    }
    if (message.seen === false) {
      this.messageService.readMessage(message.id).subscribe(
        (success) => {},
        (error) => {}
      );
    }
  }

}
