import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SectionService} from '../services/section.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  sectionTitle = false;
  sectionDescription = false;
  sectionModerator = false;

  threadTitle = false;
  threadContent = false;
  threadAuthor = false;
  threadSection = false;

  error = false;
  @ViewChild('form') form: NgForm;
  constructor(private sectionService: SectionService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  submit() {
    if (this.form.value.entity === 'section') {
      this.onSectionSearch();
    } else if (this.form.value.entity === 'thread') {
      this.onThreadSearch();
    } else if (this.form.value.entity === 'user') {
      this.onUserSearch();
    }
  }
  onUserSearch() {
    const username = this.form.value.username;
    this.router.navigate(['user', username]);
  }

  onThreadSearch() {
    let title = '';
    let contentType = '';
    let author = '';
    let sectionID = '';
    if (this.threadTitle) {
      title = this.form.value.threadTitle;
    }
    if (this.threadContent) {
      contentType = this.form.value.threadContent;
    }
    if (this.threadAuthor) {
      author = this.form.value.threadAuthor;
    }
    if (this.threadSection) {
      sectionID = this.form.value.threadSection;
    }
    this.router.navigate(['/threads'], {queryParams: {'title': title, 'contentType': contentType, 'author': author, 'sectionID': sectionID}});
  }
  onSectionSearch() {
    let title = '';
    let description = '';
    let moderator = '';
    if (this.sectionTitle) {
      title = this.form.value.sectionTitle;
    }
    if (this.sectionDescription) {
      description = this.form.value.sectionDescription;
    }
    if (this.sectionModerator) {
      moderator = this.form.value.sectionModerator;
    }
    this.router.navigate(['/sections'], {queryParams: {'title': title, 'description': description, 'moderator': moderator}});
  }

}
