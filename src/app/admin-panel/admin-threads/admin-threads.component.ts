import { Component, OnInit } from '@angular/core';
import {ThreadService} from '../../services/thread.service';
import {ThreadModel} from '../../model/thread.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-admin-threads',
  templateUrl: './admin-threads.component.html',
  styleUrls: ['./admin-threads.component.css']
})
export class AdminThreadsComponent implements OnInit {
  threadList: ThreadModel[];
  openEdit: any = new Object();
  errorMsg: boolean;
  constructor(private threadService: ThreadService, private userService: UserService) { }

  ngOnInit() {
    if (this.userService.loggedUserToken.role === 'ADMIN') {
      this.threadService.getAllThread().subscribe(
        (threadList) => this.threadList = threadList,
        (error) => console.log(error)
      );
    } else {
      this.threadService.getUserThreads(this.userService.loggedUserToken.username).subscribe(
        (threadList) => this.threadList = threadList,
        (error) => console.log(error)
      );
    }
  }

  onopenEdit(index: number) {
    if (this.openEdit.id == index) {
      this.openEdit.id = -1;
    } else {
      this.openEdit.id = index;
    }
  }
  onDelete(thread: ThreadModel, index: number) {
    this.threadService.deleteThread(thread.naturalID).subscribe(
      (message) => this.threadList.splice(index, 1),
      (error) => this.errorMsg = true
    );
  }
}
