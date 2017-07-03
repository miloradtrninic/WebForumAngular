import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {UserService} from './user.service';
import { Observable } from 'rxjs/Rx'
import {Message} from '../model/message.model';
/**
 * Created by komp on 6/30/2017.
 */
@Injectable()
export class MessageService {

  baseUrl = 'http://localhost:8080/WebForum/webapi/messages/';


  constructor(private http: Http, private userService: UserService) {}

  getInbox() {
    return this.http.get(this.baseUrl + 'inbox', {headers: this.userService.getAuthHeader()})
      .map(this.extractDataList)
      .catch(this.handleError);
  }
  getOutbox() {
    return this.http.get(this.baseUrl + 'outbox', {headers: this.userService.getAuthHeader()})
      .map(this.extractDataList)
      .catch(this.handleError);
  }

  sendMessage(toSend: Message) {
    return this.http.post(this.baseUrl + 'send', toSend, {headers: this.userService.getJSONAuthHeader()})
      .map(this.extractData)
      .catch(this.handleError);
  }
  readMessage(messageID: number){
    return this.http.get(this.baseUrl + 'readMessage/' + messageID, {headers: this.userService.getJSONAuthHeader()})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractDataList(res: Response) {
    const body: Message[] = res.json();
    return body || [];
  }

  private extractData(res: Response) {
    const body: Message = res.json();
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
