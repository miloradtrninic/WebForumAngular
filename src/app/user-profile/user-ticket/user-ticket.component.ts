import { Component, OnInit } from '@angular/core';
import {TicketModel} from '../../model/ticket.model';
import {TicketService} from '../../services/ticket.service';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.css']
})
export class UserTicketComponent implements OnInit {
  tickets: TicketModel[];
  errormsg: string;
  toRead: any = new Object();
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getUserTickets().subscribe(
      (tickets) => this.tickets = tickets,
      (error) => this.errormsg = error
    );
  }
  readTicket(index: number) {
    if (this.toRead.id == index) {
      this.toRead.id = -1;
    } else{
      this.toRead.id = index;
    }
  }
}
