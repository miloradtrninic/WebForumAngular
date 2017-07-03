import {Component, OnInit, ViewChild} from '@angular/core';
import {CommentModel} from '../../model/comment.model';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  public visible = false;
  public visibleAnimate = false;
  public entity: CommentModel;
  public title: string;

  success = false;
  error = false;
  @ViewChild('form') form: NgForm;
  constructor(public userService: UserService, private commentService: CommentService) {}
  ngOnInit() {
  }


  public show(entity: CommentModel, title?: string) {
    this.visible = true;
    this.entity = entity;
    this.title = title;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide() {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent) {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  onSubmit() {
    this.entity.text = this.form.value.text;
    this.entity.edited = true;
    this.commentService.edit(this.entity).subscribe(
      (success) => {
        this.success = true;
        this.error = false;
        this.form.reset();
      },
      (error) => {
        this.success = false;
        this.error = true;
      }
    );
  }

}
