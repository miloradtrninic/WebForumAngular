import { Component, OnInit } from '@angular/core';
import {SectionModel} from '../../model/section.model';
import {SectionService} from '../../services/section.service';

@Component({
  selector: 'app-admin-sections',
  templateUrl: './admin-sections.component.html',
  styleUrls: ['./admin-sections.component.css']
})
export class AdminSectionsComponent implements OnInit {
  sectionList: SectionModel[];
  openEdit: any = new Object();
  errorMessage: string;
  constructor(private sectionService: SectionService) { }

  ngOnInit() {
    this.sectionService.getModSections().subscribe(
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

  onDelete(section: SectionModel, index: number) {
    this.sectionService.deleteSection(section.naturalID).subscribe(
      (sucess) => this.sectionList.splice(index, 1),
      (error) => this.errorMessage = error
    );
  }
}
