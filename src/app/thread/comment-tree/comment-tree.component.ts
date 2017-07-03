import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from '../../model/comment.model';
import {CommentService} from '../../services/comment.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.css']
})
export class CommentTreeComponent implements OnInit {
  @Input() comment: CommentModel;
  @Input() allComments: CommentModel[] = [];
  @Output() loginAlert: EventEmitter<boolean> = new EventEmitter();

  subCommentsList: CommentModel[] = [];
  errorMessage: string;
  constructor(public commentService: CommentService, public userService: UserService) { }

  ngOnInit() {
    // this.commentService.getSubComments(this.comment.id).subscribe(
    //   (subCommentList) => {this.subCommentsList = subCommentList},
    //   (error) => {this.errorMessage = error}
    // );
    this.fillArray();
  }
  fillArray() {
    for (const comment of this.allComments){
      if (comment.parent === this.comment.id) {
        this.subCommentsList.push(comment);
      }
    };
  }
  isSubComment(): boolean {
    return this.comment.parent != null;
  }

  likeComment(comment: CommentModel) {
    this.commentService.like(comment).subscribe(
      (commentReturn) => {comment.likes++},
      (errorMessage) => this.errorMessage = errorMessage
    );
  }
  dislikeComment(comment: CommentModel) {
    this.commentService.dislike(comment).subscribe(
      (commentReturn) => comment.dislikes++,
      (errorMessage) => this.errorMessage = errorMessage
    );
  }
  onReply(comment?: CommentModel) {
    const element = window.document.getElementById('commentBox');
    if (element != null) {
      this.commentService.commentParent = comment;
      element.scrollIntoView();
    }
    this.loginAlert.emit(true);
  }
  canEditComment(comment: CommentModel) {
    if (!this.userService.isLoggedIn()){
      return false;
    }
    if (comment.author === '') {
      return false;
    }
    if (comment.author === this.userService.loggedUserToken.username) {
      return true;
    }
    if (this.userService.loggedUserToken.role === 'MODERATOR') {
      return true;
    }
    return false;
  }
  canDeleteComment(comment: CommentModel) {
    if (!this.userService.isLoggedIn()){
      return false;
    }
    if (comment.author === '') {
      return false;
    }
    if (comment.author === this.userService.loggedUserToken.username) {
      return true;
    }
    if (this.userService.loggedUserToken.role === 'ADMIN' || this.userService.loggedUserToken.role === 'MODERATOR') {
      return true;
    }
    return false;
  }
  deleteComment(comment: CommentModel) {
    this.commentService.delete(comment).subscribe(
      (removed) => {
        comment.author = '';
        comment.text = '';
      },
      (error) => this.errorMessage = error
    );
  }

}
