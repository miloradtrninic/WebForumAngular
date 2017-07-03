import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import {TicketService} from '../services/ticket.service';
import {TicketModel} from '../model/ticket.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  public visible = false;
  public visibleAnimate = false;
  public contentType: string;
  public entity: string;
  public title: string;
  success = false;
  error = false;
  @ViewChild('form') form: NgForm;
  constructor(public userService: UserService, private ticketService: TicketService, private datepipe: DatePipe) {}
  ngOnInit() {
  }


  public show(entity: string, contentType: string, title?: string) {
    this.visible = true;
    this.entity = entity;
    this.title = title;
    this.contentType = contentType;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide() {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent) {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  onSubmit() {
    const ticket = new TicketModel();
    ticket.id = -1; // na server ce resiti id
    ticket.response = null;
    ticket.content = this.form.value.content;
    ticket.type = this.contentType;
    ticket.authorUsername = this.userService.loggedUserToken.username;
    ticket.entity = this.entity;
    const today = new Date();
    ticket.date = this.datepipe.transform(today, 'dd-MM-yy');
    this.ticketService.submitTicket(ticket).subscribe(
      (success) => {
        this.success = true;
        this.error = false;
        this.form.reset();
      },
      (error) => {
        this.success = false;
        this.error = true;
      }
    );
  }


}
