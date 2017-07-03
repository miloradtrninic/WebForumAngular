import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import {SectionModel} from '../model/section.model';
import {UserService} from './user.service';


@Injectable()
export class SectionService {
  private getAllURL = 'WebForum/webapi/section';
  private createURL = 'WebForum/webapi/section/newSection';
  private sectionModURL = 'WebForum/webapi/users/sectionmod';
  private sectionSubURL = 'WebForum/webapi/users/subscribed';
  private unsubscribeURL  = 'WebForum/webapi/users/unsubscribe';
  private searchURL  = 'WebForum/webapi/section/search';
  private subscribeURL  = 'WebForum/webapi/users/subscribe';

  private deleteURL  = 'WebForum/webapi/section/delete';

  constructor(private http: Http, private userService: UserService) { }

  addSection(newSection: SectionModel): Observable<SectionModel>  {
    const formData: FormData = new FormData();
    formData.append('title', newSection.title);
    formData.append('rules', newSection.rulesString);
    formData.append('headModerator', newSection.headModerator);
    formData.append('description', newSection.description);
    formData.append('naturalID', newSection.naturalID);
    formData.append('imagePath', newSection.imagePath, newSection.imagePath.name);
    return this.http.post('http://localhost:8080/' + this.createURL, formData, {headers: this.userService.getAuthHeaderMultipart()})
      .map(this.extractData)
      .catch(this.handleError);
  }
  search(title: string, description: string, moderator: string) {
    const body = `title=${title}&description=${description}&moderator=${moderator}`;
    return this.http.post('http://localhost:8080/' + this.searchURL, body, {headers: this.userService.getFORMHeader()})
      .map(this.extractData)
      .catch(this.handleError)
  }
  getSection(naturalID: string) {
    return this.http.get('http://localhost:8080/' + this.getAllURL + '/' + naturalID)
      .map((res: Response) => {
        const body: any[] = res.json();
        return body || [];
      })
      .catch(this.handleError);
  }

  getSections(): Observable<SectionModel[]> {
    return this.http.get('http://localhost:8080/' + this.getAllURL)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getModSections() {
    return this.http.get('http://localhost:8080/' + this.sectionModURL, {headers: this.userService.getAuthHeader()})
      .map((res: Response) => {
        const body: SectionModel[] = res.json();
        return body || [];
      })
      .catch(this.handleError);
  }
  getUserSubSections() {
    return this.http.get('http://localhost:8080/' + this.sectionSubURL, {headers: this.userService.getAuthHeader()})
      .map((res: Response) => {
        const body: SectionModel[] = res.json();
        return body || [];
      })
      .catch(this.handleError);
  }
  unsubscribe(section: SectionModel) {
    return this.http.post('http://localhost:8080/' + this.unsubscribeURL,
      section,
      {headers: this.userService.getJSONAuthHeader()})
      .map((res: Response) => {
        const body: SectionModel[] = res.json();
        return body || [];
      })
      .catch(this.handleError);
  }
  subscribe(section: SectionModel) {
    return this.http.post('http://localhost:8080/' + this.subscribeURL,
      section,
      {headers: this.userService.getJSONAuthHeader()})
      .map((res: Response) => {
        const body: SectionModel[] = res.json();
        return body || [];
      })
      .catch(this.handleError);
  }

  deleteSection(naturalID: string) {
    return this.http.delete('http://localhost:8080/' + this.deleteURL + '/' + naturalID, {headers: this.userService.getJSONAuthHeader()})
      .map((res: Response) => {
        const body: any = res.text();
        return body || {};
      })
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body: SectionModel[] = res.json();
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
