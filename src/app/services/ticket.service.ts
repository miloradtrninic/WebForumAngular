import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {UserService} from './user.service';
import { Observable } from 'rxjs/Rx'
import {TicketModel} from '../model/ticket.model';

@Injectable()
export class TicketService {
  baseUrl = 'http://localhost:8080/WebForum/webapi/tickets/';
  constructor(private http: Http, private userService: UserService) {}

  getUserTickets() {
    return this.http.get(this.baseUrl + 'user', {headers: this.userService.getAuthHeader()})
      .map(this.extractDataList)
      .catch(this.handleError);
  }
  getModTicket() {
    return this.http.get(this.baseUrl + 'moderator', {headers: this.userService.getAuthHeader()})
      .map(this.extractDataList)
      .catch(this.handleError);
  }
  resolveTicket(ticket: TicketModel) {
    return this.http.post(this.baseUrl + 'resolve', ticket, {headers: this.userService.getJSONAuthHeader()})
      .map(this.extractData)
      .catch(this.handleError);
  }
  submitTicket(ticket: TicketModel) {
    return this.http.post(this.baseUrl + 'submit', ticket, {headers: this.userService.getJSONAuthHeader()})
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractDataList(res: Response) {
    const body: TicketModel[] = res.json();
    return body || [];
  }
  private extractData(res: Response) {
    const body: TicketModel = res.json();
    return body || {};
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
