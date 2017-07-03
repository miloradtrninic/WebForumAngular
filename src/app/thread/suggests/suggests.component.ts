import {Component, OnInit} from '@angular/core';
import {ThreadModel} from '../../model/thread.model';
import {ThreadService} from '../../services/thread.service';
import {CommentModel} from '../../model/comment.model';
import {CommentService} from '../../services/comment.service';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-suggests',
  templateUrl: './suggests.component.html',
  styleUrls: ['./suggests.component.css']
})
export class SuggestsComponent implements OnInit {
  sugestList: ThreadModel[]
  constructor(private threadService: ThreadService) { }

  ngOnInit() {
    this.threadService.getSuggests().subscribe(
      (list) => this.sugestList = list,
      (error) => console.log(error)
    )
  }

}
