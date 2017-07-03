import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Message} from '../../../model/message.model';
import {UserService} from '../../../services/user.service';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css']
})
export class MessageSendComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  success = false;
  error = false;
  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
  }

  onSubmit() {
    const message = new Message();
    message.content = this.form.value.content;
    message.id = -1;
    message.recepient = this.form.value.recipient.trim();
    message.sender = this.userService.loggedUserToken.username;
    message.seen = false;
    this.messageService.sendMessage(message).subscribe(
      (success) => {this.success = true; this.error = false; this.form.reset(); },
      (error) => {this.error = true; this.success = false; }
    );

  }
}
