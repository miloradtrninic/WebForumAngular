import { Injectable } from '@angular/core';
import {ThreadModel} from '../model/thread.model';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx'
import {UserService} from './user.service';

@Injectable()
export class ThreadService {
  private url = 'http://localhost:8080/';
  private getAllURL = 'WebForum/webapi/threads';
  private createURL = 'WebForum/webapi/threads/newthread';
  private updateURL = 'WebForum/webapi/threads/update';
  private updateLikesURL = 'WebForum/webapi/threads/updateLikes';
  private searchURL = 'WebForum/webapi/threads/search';
  private suggestURL = 'WebForum/webapi/threads/suggest';
  private deleteURL = 'WebForum/webapi/threads/delete';
  headers = new Headers({'Content-Type': 'application/json' });

  constructor(private http: Http, private userService: UserService) {}
  getAllThread() {
    return this.http.get(this.url + this.getAllURL, {headers: this.userService.getJSONAuthHeader()})
      .map(this.extractData)
      .catch(this.handleError);
  }
  getUserThreads(username?: string) {
    return this.http.get('http://localhost:8080/WebForum/webapi/users/threads', {headers: this.userService.getAuthHeader()})
      .map(this.extractData)
      .catch(this.handleError);
  }
  search(title: string, contentType: string, author: string, sectionID: string){
    const body = `title=${title}&contentType=${contentType}&author=${author}&sectionID=${sectionID}`;
    return this.http.post('http://localhost:8080/' + this.searchURL, body, {headers: this.userService.getFORMHeader()})
      .map(this.extractData)
      .catch(this.handleError)
  }
  getSuggests() {
    return this.http.get('http://localhost:8080/' + this.suggestURL, {headers: this.userService.getJSONHeader()})
      .map(this.extractData)
      .catch(this.handleError);
  }
  createThread(thread: ThreadModel) {
    const formData: FormData = new FormData();
    formData.append('title', thread.title);
    formData.append('naturalID', thread.naturalID);
    formData.append('type', thread.type);
    formData.append('author', thread.author);
    formData.append('likes', thread.likes.toString());
    formData.append('dislikes', thread.dislikes.toString());
    formData.append('created', thread.created);
    formData.append('parentSection', thread.parentSection);
    if (thread.content instanceof File) {
      formData.append('file', thread.content, thread.content.name);
      formData.append('content', '');
    } else {
      formData.append('file', null, null);
      formData.append('content', thread.content);
    }
    console.log(formData);
    return this.http.post(this.url + this.createURL, formData, {headers: this.userService.getAuthHeaderMultipart()})
      .map((res: Response) => {
        const body: ThreadModel = res.json();
        return body || {};
      }).catch(this.handleError);
  }
  updateThread(thread: ThreadModel) {
    const formData: FormData = new FormData();
    formData.append('title', thread.title);
    formData.append('naturalID', thread.naturalID);
    formData.append('type', thread.type);
    if (thread.content instanceof File) {
      formData.append('file', thread.content, thread.content.name);
      formData.append('content', '');
    } else {
      formData.append('file', null, null);
      formData.append('content', thread.content);
    }
    console.log(formData);
    return this.http.post(this.url + this.updateURL, formData, {headers: this.userService.getAuthHeaderMultipart()})
      .map((res: Response) => {
        const body: ThreadModel = res.json();
        return body || {};
      }).catch(this.handleError);
  }


  getThread(naturalID: string) {
    return this.http.get(this.url + this.getAllURL + '/' + naturalID, {headers: this.headers})
      .map(
        (resp: Response) => {
          const body: any = resp.json();
          return body || {};
        }
      )
      .catch(this.handleError);
  }

  deleteThread(naturalID: string) {
    return this.http.delete(this.url + this.deleteURL + '/' + naturalID, {headers: this.userService.getJSONAuthHeader()}).map(
      (res: Response) => res.text())
      .catch(this.handleError);
  }
  like(thread: ThreadModel) {
    return this.http.put(this.url + this.updateLikesURL, thread, {headers: this.userService.getJSONAuthHeader()})
      .map(
        (res: Response) => {
          const body: ThreadModel = res.json();
          return body || {};
        }
      )
      .catch(this.handleError);
  }
  dislike(thread: ThreadModel) {
    return this.http.put(this.url + this.updateLikesURL, thread, {headers: this.userService.getJSONAuthHeader()})
      .map(
        (res: Response) => {
          const body: ThreadModel = res.json();
          return body || {};
        }
      )
      .catch(error => Observable.throw(error));
  }


  private extractData(res: Response) {
    const body: ThreadModel[] = res.json();
    return body || [];
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errorMsg: string;
    if (error instanceof Response) {
      const status = error.status;
      if (status === 401) {
        errorMsg = 'Bad username or password';
      }
      if (status === 500) {
        errorMsg = 'There was an issue with database!';
      }
      if (status === 204) {
        errorMsg = 'All ready logged in';
      }
      return Observable.throw(errorMsg);
    }
  }

}
