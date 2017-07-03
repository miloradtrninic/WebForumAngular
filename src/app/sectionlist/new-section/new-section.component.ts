import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SectionModel} from '../../model/section.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {SectionService} from '../../services/section.service';

@Component({
  selector: 'app-new-section',
  templateUrl: './new-section.component.html',
  styleUrls: ['./new-section.component.css']
})
export class NewSectionComponent implements OnInit {
  image: File;
  errorSet = false;
  @ViewChild('form') form: NgForm;
  @Input('toEdit') toEdit: SectionModel;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private sectionService: SectionService, private router: Router) { }

  ngOnInit() {}

  submit() {
    if (this.toEdit == null) {
      const newSection = new SectionModel();
      newSection.headModerator = this.userService.loggedUserToken.username;
      newSection.title = this.form.value.title;
      newSection.naturalID = newSection.title.replace(/[^a-zA-Z_-]/g, '');
      newSection.description = this.form.value.description;
      newSection.imagePath = this.image;
      newSection.rulesString = this.form.value.rules;

      this.sectionService.addSection(newSection).subscribe(
        (section: SectionModel) => this.router.navigate(['/section/' + section.naturalID]),
        (error) => this.errorSet = true
      );
    } else {
      this.toEdit.title = this.form.value.title;
      this.toEdit.imagePath = this.image;
      this.toEdit.rulesString = this.form.value.rules;
      this.toEdit.description = this.form.value.description;
      // this.threadService.updateThread(this.toEdit).subscribe(
      //   (thread: ThreadModel) => this.router.navigate(['/thread/' + thread.naturalID]),
      //   (error) => console.log(error)
      // );
    }

  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image = fileList[0];
    }
  }

}
