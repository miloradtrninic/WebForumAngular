import { Component, OnInit } from '@angular/core';
import {SectionService} from '../../services/section.service';
import {SectionModel} from '../../model/section.model';

@Component({
  selector: 'app-sub-sections',
  templateUrl: './sub-sections.component.html',
  styleUrls: ['./sub-sections.component.css']
})
export class SubSectionsComponent implements OnInit {
  sectionList: SectionModel[];
  openEdit: any = new Object();
  errorMessage: string;
  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionService.getUserSubSections().subscribe(
      (sectionList) => this.sectionList = sectionList,
      (error) => this.errorMessage = error
    );
  }
  onOpenPreview(index: number) {
    if (this.openEdit.id == index) {
      this.openEdit.id = -1;
    } else {
      this.openEdit.id = index;
    }
  }
  unsubscribe(section: SectionModel, index: number) {
    this.sectionService.unsubscribe(section).subscribe(
      (sectionList) => this.sectionList.splice(index, 1),
      (error) => this.errorMessage = error
    );
  }

}
