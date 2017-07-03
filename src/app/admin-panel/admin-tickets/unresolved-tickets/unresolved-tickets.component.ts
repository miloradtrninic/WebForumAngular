import {Component, OnInit, ViewChild} from '@angular/core';
import {TicketModel} from '../../../model/ticket.model';
import {TicketService} from '../../../services/ticket.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-unresolved-tickets',
  templateUrl: './unresolved-tickets.component.html',
  styleUrls: ['./unresolved-tickets.component.css']
})
export class UnresolvedTicketsComponent implements OnInit {

  tickets: TicketModel[]= new Array;
  errormsg: string;
  toRead: any = new Object();

  @ViewChild('form') form: NgForm;
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getModTicket().subscribe(
      (tickets: TicketModel[]) => {
        for (const ticket of tickets) {
          if (ticket.response == null) {
            this.tickets.push(ticket);
          }
        }
      },
      (error) => this.errormsg = error
    );
  }
  onSubmit(ticket: TicketModel, index: number) {
    ticket.response = this.form.value.response;
    this.ticketService.resolveTicket(ticket).subscribe(
      (success) => this.tickets.splice(index, 1),
      (error) => this.errormsg = error
    )
  }
  readTicket(index: number) {
    if (this.toRead.id === index) {
      this.toRead.id = -1;
    } else{
      this.toRead.id = index;
    }
  }
}
