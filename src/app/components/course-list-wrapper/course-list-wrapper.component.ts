import { Component, OnInit } from '@angular/core';
import {Course} from '../models/course.interface';
import {CourseService} from '../../services/course.service';
import {switchMap, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-course-list-wrapper',
  templateUrl: './course-list-wrapper.component.html',
  styleUrls: ['./course-list-wrapper.component.scss']
})
export class CourseListWrapperComponent implements OnInit {

  courses: Course[];


  constructor(private courseService: CourseService) {
    this.courses = [];

  }

  ngOnInit(): void {
    this.courseService.getCourses().
    pipe(take(1)).subscribe((response) => {
      this.courses = response;
    });  }


  onCourseDeleted(id: number): void{
   this.courseService.deleteCourse(id).pipe(
     switchMap(() => this.courseService.getCourses()),
     take(1)).subscribe((response => this.courses = response));
  }

}
