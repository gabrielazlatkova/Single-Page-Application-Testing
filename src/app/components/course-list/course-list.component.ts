import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../models/course.interface';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  @Input() courses;

  @Output() courseDeleted = new EventEmitter<number>();

  selectedCourse: Course;


  constructor() {}
  ngOnInit(): void{}

  onCourseClicked(course: Course): void{
    this.selectedCourse = course;
  }


}
