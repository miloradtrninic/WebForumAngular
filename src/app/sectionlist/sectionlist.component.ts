import { Component, OnInit } from '@angular/core';
import {SectionModel} from '../model/section.model';
import {SectionService} from '../services/section.service';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sectionlist',
  templateUrl: './sectionlist.component.html',
  styleUrls: ['./sectionlist.component.css']
})
export class SectionlistComponent implements OnInit {
  sectionList: SectionModel[] = [];
  errorMessage: string;
  errorSearch = false;
  constructor(private sectionService: SectionService,
              public userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.errorSearch = false
    const title = this.route.snapshot.queryParams['title'];
    const description = this.route.snapshot.queryParams['description'];
    const moderator = this.route.snapshot.queryParams['moderator'];
    if (title == null && description == null && moderator == null) {
      this.getSections();
    } else {
      this.sectionService.search(title, description, moderator).subscribe(
        sections  => {
          this.sectionList = sections;
          if (this.sectionList.length === 0) {
            this.errorSearch = true
          }
        },
        error =>  this.errorMessage = <any>error
      )
    }

  }
  getSections() {
    this.sectionService.getSections().subscribe(
      sections  => {
        this.sectionList = sections;
      },
      error =>  this.errorMessage = <any>error
    );

  }
  subscribe(section: SectionModel, index: number) {
    this.sectionService.subscribe(section).subscribe(
      (success) => console.log('subscribed'),
      (error) => this.errorMessage = error
    );
  }

  addSection() {
    this.router.navigate(['/sections/newsection']);
  }


}
