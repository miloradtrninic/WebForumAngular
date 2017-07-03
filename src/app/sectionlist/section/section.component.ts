import {Component, Input, OnInit} from '@angular/core';
import {SectionModel} from '../../model/section.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ThreadModel} from 'app/model/thread.model';
import {ThreadService} from '../../services/thread.service';
import {SectionService} from '../../services/section.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  threadList: ThreadModel[];
  section: SectionModel;
  sectionId: string;
  errorMessage: string;
  subscribeAllowed = true;
  errorSearch = false;
  constructor(private route: ActivatedRoute, private sectionService: SectionService,
              public router: Router, private userService: UserService, private threadService: ThreadService) { }

  ngOnInit() {
    this.errorSearch = false;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.sectionId = params['id'];
          // this.section = this.sectionService.getSection(this.id);
        });
    if (this.sectionId != null) {
      this.sectionService.getSection(this.sectionId)
        .subscribe(
          (sectionProxy) => {
            this.section = sectionProxy.section;
            this.threadList = sectionProxy.threads;
            for (const sectionID of this.userService.loggedUserToken.subscribed) {
              if (sectionID === this.section.naturalID) {
                this.subscribeAllowed = false;
              }
            }
          },
          (error) => this.errorMessage = error
        );
      this.subscribeAllowed = true;
    } else {
      const title = this.route.snapshot.queryParams['title'];
      const contentType = this.route.snapshot.queryParams['contentType'];
      const author = this.route.snapshot.queryParams['author'];
      const sectionID = this.route.snapshot.queryParams['sectionID'];
      this.threadService.search(title, contentType, author, sectionID).subscribe(
        (threadList) => {
          this.threadList = threadList
          if (this.threadList.length === 0) {
            this.errorSearch = true;
          }
        },
        (error) => this.errorMessage = error
      );
    }
  }

  onCreate() {
    this.router.navigate(['newthread'], {relativeTo: this.route});
  }

  unsubscribe() {
    this.sectionService.unsubscribe(this.section).subscribe(
      (success) => {
        this.subscribeAllowed = true;
        const index = this.userService.loggedUserToken.subscribed.indexOf(this.section.naturalID);
        this.userService.loggedUserToken.subscribed.splice(index, 1);
        this.userService.storeToken();
      },
      (error) => this.errorMessage = error
    );
  }
  subscribe() {
    this.sectionService.subscribe(this.section).subscribe(
      (success) => {
        this.subscribeAllowed = false;
        this.userService.loggedUserToken.subscribed.push(this.section.naturalID);
        this.userService.storeToken();
      },
      (error) => this.errorMessage = error
    );
  }

}
