import {ComponentFixture, fakeAsync, TestBed, async, waitForAsync} from '@angular/core/testing';

import { CourseListWrapperComponent } from './course-list-wrapper.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, Input} from '@angular/core';
import {Course} from '../models/course.interface';
import {CourseService} from '../../services/course.service';
import {Observable, of} from 'rxjs';
import {CourseListComponent} from '../course-list/course-list.component';
import {By} from '@angular/platform-browser';
import {CourseItemComponent} from '../course-item/course-item.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {CourseFormComponent} from '../course-form/course-form.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-course-list',
  template: ''
})
class CourseListMockComponent{
  @Input() courses: Course[];
}
@Component({
  selector: 'app-course-form',
  template: ''
})
class CourseFormMockComponent{
}

class CourseMockService{
  courses = [
    {
      id: 1,
      title: 'Fundamentals of digital marketing',
      description: 'Master the basics of digital marketing with our free course . There are 26 modules to explore, packed full of practical exercises and real-world examples to help you turn knowledge into action.Learn step by step how to market a business online from scratch across all the major marketing channels.Follow the steps on screen to get results at work, for own business or for your digital marketing clients.',
      image: ''
    },
    {
      id: 2,
      title: 'Big Data',
      description: 'Learn how big data is driving organisational change and essential analytical tools and techniques, including data mining and PageRank algorithms.In this course, part of the Big Data MicroMasters program, you will learn how big data is driving organisational change and the key challenges organizations face when trying to analyse massive data sets.\n',
      image: ''
    },
    {
      id: 3,
      title: 'Machine Learning',
      description: 'Machine learning is the science of getting computers to act without being explicitly programmed.This course provides a broad introduction to machine learning, datamining, and statistical pattern recognition. Topics include: (i) Supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks). (ii) Unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning).\n',
      image: ''
    },
    {
      id: 4,
      title: 'Web Design: Be Responsive!',
      description: 'Make the jump to Responsive Design!By completing your own online portfolio, you will learn all the steps to design webs to leave the file prepared for the programmer, and you will also enter the \'Responisve Web Design\' or adaptive web design, the most used method currently that allows your Design suits all devices. Get away from the typical predesigned portfolios creating yours from scratch and who knows, this course can be the first step to dedicate yourself fully to web design or serve to complement your creative services.',
      image: ''
    }
  ];

  getCourses(): Observable<Course[]> {
    return of([...this.courses]);
  }
  deleteCourse(id: number): Observable<undefined>{
    this.courses = this.courses.filter(course => course.id !== id);

    return of(undefined);
  }

}

describe('CourseListWrapperComponent', () => {
  describe('Unit test', () => {
    let component: CourseListWrapperComponent;
    let fixture: ComponentFixture<CourseListWrapperComponent>;


    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([{
            path: 'courses/create',
            component: CourseFormComponent
          }])
        ],
        providers: [
          {
            provide: CourseService,
            useClass: CourseMockService
          }
        ],
        declarations: [
          CourseListMockComponent,
          CourseFormComponent,
          CourseListWrapperComponent]
      })
        .compileComponents();

    });

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseListWrapperComponent);
      component = fixture.componentInstance;


      // fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be an empty before ngOnInit',  () => {
      expect(component.courses).toBeDefined();
      expect(component.courses.length).toEqual(0);

    });

    it('should load courses after ngOnInit', () =>  {
      const service = TestBed.inject(CourseService);
      const courses = [
        {
          id: 1,
          title: 'Fundamentals of digital marketing',
          description: 'Master the basics of digital marketing with our free course . There are 26 modules to explore, packed full of practical exercises and real-world examples to help you turn knowledge into action.Learn step by step how to market a business online from scratch across all the major marketing channels.Follow the steps on screen to get results at work, for own business or for your digital marketing clients.',
          image: ''
        },
        {
          id: 2,
          title: 'Big Data',
          description: 'Learn how big data is driving organisational change and essential analytical tools and techniques, including data mining and PageRank algorithms.In this course, part of the Big Data MicroMasters program, you will learn how big data is driving organisational change and the key challenges organizations face when trying to analyse massive data sets.\n',
          image: ''
        },
        {
          id: 3,
          title: 'Machine Learning',
          description: 'Machine learning is the science of getting computers to act without being explicitly programmed.This course provides a broad introduction to machine learning, datamining, and statistical pattern recognition. Topics include: (i) Supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks). (ii) Unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning).\n',
          image: ''
        },
        {
          id: 4,
          title: 'Web Design: Be Responsive!',
          description: 'Make the jump to Responsive Design!By completing your own online portfolio, you will learn all the steps to design webs to leave the file prepared for the programmer, and you will also enter the \'Responisve Web Design\' or adaptive web design, the most used method currently that allows your Design suits all devices. Get away from the typical predesigned portfolios creating yours from scratch and who knows, this course can be the first step to dedicate yourself fully to web design or serve to complement your creative services.',
          image: ''
        }
      ];

      spyOn(service, 'getCourses').and.returnValues(of(courses));
      component.ngOnInit();
      expect(component.courses).toBeDefined();
      expect(component.courses.length).toEqual(4);
    });

    it('should update courses list after ', () => {
      component.ngOnInit();

      expect(component.courses).toBeDefined();

      const id = 1;
      component.onCourseDeleted(id);


      expect(component.courses.length).toEqual(3);
      expect(component.courses.find(course => course.id === id)).toBeUndefined();
    });

    it('should navigate to create form when Add new course is clicked', waitForAsync( () =>  {
      const router = TestBed.inject(Router);
      const location = TestBed.inject(Location);
      const a = fixture.nativeElement.querySelector('#createRouter').click();
      fixture.whenStable().then(() => {
          expect(location.path()).toBe('/courses/create');
        });

    }));
  });

  describe('Integration test', () => {
    let component: CourseListWrapperComponent;
    let fixture: ComponentFixture<CourseListWrapperComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ],
        providers: [
          {
            provide: CourseService,
            useClass: CourseMockService
          }
        ],
        declarations: [
          CourseItemComponent,
          CourseListComponent,
          CourseListWrapperComponent
        ]
      });
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(CourseListWrapperComponent);
      component = fixture.componentInstance;
    });

    it('should render course-list with 4 components', () => {
       fixture.detectChanges();
       const listComponent = fixture.debugElement.query(By.css('#course-list'));
       expect(listComponent).toBeDefined();

       const childElement = listComponent.children[0].queryAll(By.css('app-course-item'));
       expect(childElement.length).toBe(4);


    });
    it('should load course with default value', () => {
     fixture.detectChanges();

     const title = fixture.debugElement.query(By.css('#cardTitle'));
     expect(title.nativeElement.textContent).toEqual('Fundamentals of digital marketing');

     const description = fixture.debugElement.query(By.css('#card-description'));
     expect(description.nativeElement.textContent).toEqual('Master the basics of digital marketing with our free course . There are 26 modules to explore, packed full of practical exercises and real-world examples to help you turn knowledge into action.Learn step by step how to market a business online from scratch across all the major marketing channels.Follow the steps on screen to get results at work, for own business or for your digital marketing clients.');

     const addToFavourite = fixture.debugElement.query(By.css('#addToFavouriteBtn'));
     expect(addToFavourite).toBeDefined();

    });


    // it('should have course item from service in component', () {
    // fixture.detectChanges();
    //
    // expect(appComponent.todoList).toEqual(todoData);
    // });
  });

});
