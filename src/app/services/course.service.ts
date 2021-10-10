import {HttpClient, } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../components/models/course.interface';
import {Injectable} from '@angular/core';
import {CourseResponse} from '../components/models/course-response.interface';
import {main} from '@angular/compiler-cli/src/main';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService{

  url = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {

  }
  getCourses(): Observable<Course[]>{
    return this.http.get<CourseResponse[]>(this.url).pipe(
      map((response: CourseResponse[]) => {
        const courses: Course[] = [];

        response.forEach(item => {
          const course = this.mapCourseResponseToCourseItem(item);
          courses.push(course);
        });
        return courses;
      })
    );
  }

  getCourse(id: number): Observable<Course>{
    return this.http.get<CourseResponse>(`${this.url}/${id}`).pipe(
      map((response: CourseResponse) => this.mapCourseResponseToCourseItem(response) )
    );
  }
  saveCourse(course: Course): Observable<undefined>{
    const body = this.mapCourseItemToCourseResponse(course);
    if (!body.id){
      return this.postCourse(body);
    }
    return this.putCourse(body);
  }
  deleteCourse(id: number): Observable<undefined>{
    const url = `${this.url}/${id}`;

    return this.http.delete<undefined>(url);
  }

  mapCourseResponseToCourseItem(response: CourseResponse): Course{
    return {
      ...response,
      description: response.additionalDetails?.description
    };

  }
  mapCourseItemToCourseResponse(course: Course): CourseResponse{
    return {
      ...course,
      additionalDetails: {
        description: course.description,
        courseCode: course.id * 10
      }
    };
  }

  private postCourse(course: CourseResponse): Observable<undefined>{
    return this.http.post<undefined>(this.url, course);
  }

  private putCourse(course: CourseResponse): Observable<undefined>{
    const url = `${this.url}/${course.id}`;
    return this.http.put<undefined>(url, course);
  }

}
