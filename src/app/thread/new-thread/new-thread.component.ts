import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ThreadModel} from '../../model/thread.model';
import {UserService} from '../../services/user.service';
import {ThreadService} from '../../services/thread.service';

@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent implements OnInit {
  defaultType;
  sectionId;
  image: File;
  @ViewChild('form') form: NgForm;
  @Input('toEdit') toEdit: ThreadModel;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private threadService: ThreadService, private router: Router) { }

  ngOnInit() {
    if (this.toEdit != null) {
      this.defaultType = this.toEdit.type;
    } else {
      this.defaultType = 'TEXT';
    }
    this.route.params
      .subscribe(
        (params: Params) => {
          this.sectionId = params['id'];
          // this.section = this.sectionService.getSection(this.id);
        }
      );
  }
  submit() {
    if (this.toEdit == null) {
      const newThread = new ThreadModel();
      newThread.author = this.userService.loggedUserToken.username;
      newThread.type = this.form.value.type;
      newThread.parentSection = this.sectionId;
      newThread.title = this.form.value.title;
      newThread.naturalID = newThread.title.replace(/[^a-zA-Z_-]/g, '');
      if (newThread.type === 'IMAGE') {
        newThread.content = this.image;
      } else if (newThread.type === 'TEXT') {
        newThread.content = this.form.value.TEXT;
      } else {
        newThread.content = this.form.value.LINK;
      }

      this.threadService.createThread(newThread).subscribe(
        (thread: ThreadModel) => this.router.navigate(['/thread/' + thread.naturalID]),
        (error) => console.log(error)
      );
    } else {
      this.toEdit.type = this.form.value.type;
      this.toEdit.title = this.form.value.title;
      if (this.toEdit.type === 'IMAGE') {
        this.toEdit.content = this.image;
      } else if (this.toEdit.type === 'TEXT') {
        this.toEdit.content = this.form.value.TEXT;
      } else {
        this.toEdit.content = this.form.value.LINK;
      }
      this.threadService.updateThread(this.toEdit).subscribe(
        (thread: ThreadModel) => this.router.navigate(['/thread/' + thread.naturalID]),
        (error) => console.log(error)
      );
    }

  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image = fileList[0];
    }
  }
}
