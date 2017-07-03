import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx'
import {CommentModel} from '../model/comment.model';
import {UserService} from './user.service';

@Injectable()
export class CommentService {
  private url = 'http://localhost:8080/';
  private getAllURL = 'WebForum/webapi/comments';
  private likeURL = 'WebForum/webapi/comments/like';
  private editURL = 'WebForum/webapi/comments/edit';
  private deleteURL = 'WebForum/webapi/comments/delete/';
  private dislikeURL = 'WebForum/webapi/comments/dislike';
  private getSubsURL = 'WebForum/webapi/comments/subcomments';

  headers = new Headers({'Content-Type': 'application/json' });

  commentParent: CommentModel; // za reply

  constructor(private http: Http, private userService: UserService) { }
  getSubComments(commentID: number) {
    return this.http.get(this.url + this.getSubsURL + '/' + commentID)
      .map(this.extractData)
      .catch(this.handleError);
  }

  replycomment(comment: CommentModel) {
    console.log(comment.date + comment.text + 'evo komentara');
    if (this.commentParent == null) {
      comment.parent = null;
      return this.http.post(this.url + this.getAllURL +  '/replyThread', comment, {headers: this.userService.getJSONAuthHeader()})
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      comment.parent = this.commentParent.id;
      return this.http.post(this.url + this.getAllURL + '/' + this.commentParent.id + '/newComment',
        comment, {headers: this.userService.getJSONAuthHeader()})
        .map(this.extractData)
        .catch(this.handleError);
    }
  }


  like(comment: CommentModel) {
    return this.http.post(this.url + this.likeURL, comment, {headers: this.userService.getJSONAuthHeader()})
      .map(
        (res: Response) => {
          const body: CommentModel = res.json();
          return body || {};
        }
      )
      .catch(this.handleError);
  }
  dislike(comment: CommentModel) {
    return this.http.post(this.url + this.dislikeURL, comment, {headers: this.userService.getJSONAuthHeader()})
      .map(
        (res: Response) => {
          const body: CommentModel = res.json();
          return body || {};
        }
      )
      .catch(this.handleError);
  }
  edit(comment: CommentModel) {
    return this.http.put(this.url + this.editURL, comment, {headers: this.userService.getJSONAuthHeader()})
      .map(
        (res: Response) => {
          const body: CommentModel = res.json();
          return body || {};
        }
      )
      .catch(this.handleError);
  }
  delete(comment: CommentModel) {
    return this.http.delete(this.url + this.deleteURL + comment.id,{headers: this.userService.getJSONAuthHeader()})
      .map(
        (res: Response) => {
          const body: CommentModel = res.json();
          return body || {};
        }
      )
      .catch(this.handleError);
  }

  private extractOne(res: Response) {
    const body: CommentModel = res.json();
    return body || {};
  }

  private extractData(res: Response) {
    const body: CommentModel[] = res.json();
    return body || [];
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
