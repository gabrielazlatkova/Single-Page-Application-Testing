import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import {Component, Input} from '@angular/core';
import {Course} from '../models/course.interface';


@Component({
  selector: 'app-course-item',
  template: ''
})
class CourseItemMockComponent{
  @Input() course: Course;
}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

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


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseItemMockComponent,
        CourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    component.courses = courses;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of courses', () => {
     const elements = fixture.nativeElement.querySelectorAll('app-course-item');
     expect(elements.length).toEqual(courses.length);
  });

  it('should render the same title as passed', () => {
     expect(component.selectedCourse).toBeUndefined();
     const selectedCourse = {
       id: 1,
       title: 'Selected course',
       description: 'example',
       image: ''
     };
     component.onCourseClicked(selectedCourse);
     expect(component.selectedCourse.title).toEqual(selectedCourse.title);
  });

});
