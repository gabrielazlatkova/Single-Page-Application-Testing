import {Component, EventEmitter , Input, OnInit, Output} from '@angular/core';
import {Course} from '../models/course.interface';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent  {

 @Input() course: Course;

 @Output() courseClicked = new EventEmitter<Course>();
 @Output() courseSelected = new EventEmitter<Course>();
 @Output() courseDeleted = new EventEmitter<number>();

 constructor() {

  }

  markAsFavourite(): void{
    this.courseClicked.emit(this.course);
}



}
