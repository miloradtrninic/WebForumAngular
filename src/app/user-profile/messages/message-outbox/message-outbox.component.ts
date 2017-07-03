import { Component, OnInit } from '@angular/core';
import {Message} from '../../../model/message.model';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-message-outbox',
  templateUrl: './message-outbox.component.html',
  styleUrls: ['./message-outbox.component.css']
})
export class MessageOutboxComponent implements OnInit {
  outboxMsg: Message[];
  errormsg: string;
  toRead: any = new Object();
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getOutbox().subscribe(
      (outboxMsg) => this.outboxMsg = outboxMsg,
      (error) => this.errormsg = error
    );
  }
  readMessaage(index: number) {
    if (this.toRead.id == index) {
      this.toRead.id = -1;
    } else{
      this.toRead.id = index;
    }
  }
}
