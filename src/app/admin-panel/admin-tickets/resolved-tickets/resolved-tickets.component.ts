import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../../services/ticket.service';
import {TicketModel} from '../../../model/ticket.model';

@Component({
  selector: 'app-resolved-tickets',
  templateUrl: './resolved-tickets.component.html',
  styleUrls: ['./resolved-tickets.component.css']
})
export class ResolvedTicketsComponent implements OnInit {
  tickets: TicketModel[] = new Array;
  errormsg: string;
  toRead: any = new Object();
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getModTicket().subscribe(
      (tickets: TicketModel[]) => {
        for (const ticket of tickets) {
          if (ticket.response != null) {
            this.tickets.push(ticket);
          }
        }
      },
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
