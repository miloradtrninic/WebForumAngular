import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ThreadModel} from '../model/thread.model';
import {Http} from '@angular/http';
import {ThreadService} from '../services/thread.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CommentModel} from '../model/comment.model';
import {CommentService} from '../services/comment.service';
import {UserService} from '../services/user.service';
import {DatePipe} from '@angular/common';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  thread: ThreadModel;
  commentList: CommentModel[] = [];
  threadID: string;
  errorMessage: string;
  loginAlert = false;
  @ViewChild('f') newCommentForm: NgForm;
  constructor(private http: Http, private threadService: ThreadService,
              private route: ActivatedRoute, public commentService: CommentService,
              public userService: UserService, private datepipe: DatePipe) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.threadID = params['id'];
          // this.section = this.sectionService.getSection(this.id);
        }
      );
    this.threadService.getThread(this.threadID).subscribe(
      (threadProxy) => {
        this.thread = threadProxy.thread;
        this.commentList = threadProxy.comments;
      },
      (error) => {
        this.errorMessage = error;
      }
    );

  }
  likeThread() {
    if (this.userService.isLoggedIn()) {
      this.thread.likes++;
      this.threadService.like(this.thread).subscribe(
        (threadRetrurn) => {
          this.thread = threadRetrurn
        },
        (errorMessage) => this.errorMessage = errorMessage
      );
    }else {
      this.loginAlert = true;
    }
  }
  dislikeThread() {
    if (this.userService.isLoggedIn()) {
      this.thread.dislikes++;
      this.threadService.dislike(this.thread).subscribe(
        (threadRetrurn) => {
          this.thread = threadRetrurn
        },
        (errorMessage) => this.errorMessage = errorMessage
      );
    }else {
      this.loginAlert = true;
    }
  }

  likeComment(comment: CommentModel) {
    if (this.userService.isLoggedIn()) {
      this.commentService.like(comment).subscribe(
        (commentReturn) => {
          comment.likes++
        },
        (errorMessage) => this.errorMessage = errorMessage
      );
    }else {
      this.loginAlert = true;
    }
  }
  dislikeComment(comment: CommentModel) {
    if (this.userService.isLoggedIn()) {
      this.commentService.dislike(comment).subscribe(
        (commentReturn) => comment.dislikes++,
        (errorMessage) => this.errorMessage = errorMessage
      );
    }else {
      this.loginAlert = true;
    }
  }
  canComment() {
    return this.userService.isLoggedIn();
  }
  sendComment() {
    const newComment = new CommentModel();
    newComment.thread = this.thread.naturalID;
    newComment.author = this.userService.loggedUserToken.username;
    const today = new Date();
    newComment.date = this.datepipe.transform(today, 'dd-MM-yyyy');
    newComment.text = this.newCommentForm.value.text;
    this.commentService.replycomment(newComment).subscribe(
      (newCommentList) => {
        this.commentList = newCommentList;
        // zavrsio reply resetovati selektovani
        this.commentService.commentParent = null;
        this.newCommentForm.reset();
      },
      (error) => this.errorMessage = error
    );
  }


  onReply(comment?: CommentModel) {
    if (this.userService.isLoggedIn()) {
      const element = window.document.getElementById('commentBox');
      if (element != null) {
        this.commentService.commentParent = comment;
        element.scrollIntoView();
      }
    } else {
      this.loginAlert = true;
    }
  }
  closeAler() {
    this.loginAlert = false;
  }
  canEditComment(comment: CommentModel) {
    if (!this.userService.isLoggedIn()) {
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
    if (!this.userService.isLoggedIn()) {
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
