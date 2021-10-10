import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../services/course.service';
import {Observable, of} from 'rxjs';
import any = jasmine.any;
import {switchMap} from 'rxjs/operators';
import {Course} from '../models/course.interface';


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

   course = {
    id: 1,
    title: 'Example Title',
    description: 'Example Description',
    image: 'ata:image/jpeg;base64,/9j/'
  };

  getCourses(): Observable<Course[]> {
    return of([...this.courses]);
  }

  getCourse(id: number): Observable<Course>{
    return of(this.course);
  }

  saveCourse(course: Course): Observable<undefined>{
    return of(undefined);
  }

}

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: CourseService,
          useClass: CourseMockService
            // class {
            // saveCourse = jasmine.createSpy('saveCourse').and.returnValue(of(undefined));
          // }
        }
      ],
      declarations: [ CourseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when have no data', () =>  {
    component.formGroup.controls.title.setValue('');
    component.formGroup.controls.description.setValue('');
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('title should be invalid when is empty', () => {
        const title = component.formGroup.controls.title;
        expect(title.valid).toBeFalsy();

        title.setValue('');
        expect(title.hasError('required')).toBeTruthy();
  });
  it('title should has minLength validator', () => {

    const title = component.formGroup.controls.title;
    expect(title.valid).toBeFalsy();

    title.setValue('Exam');
    expect(title.hasError('minlength')).toBeTruthy();
  });
  it('description should has required validator', () => {

    const description = component.formGroup.controls.description;
    expect(description.valid).toBeFalsy();

    description.setValue('');
    expect(description.hasError('required')).toBeTruthy();
  });

  it('should navigate to list after onSubmit() ', () => {
    expect(component.formGroup.valid).toBeFalse();

    const addedCourse = {
      id: null,
      title: 'Example Title',
      description: 'Example Description',
      image: 'ata:image/jpeg;base64,/9j/'
    };
    component.formGroup.controls.title.setValue('Example Title');
    component.formGroup.controls.description.setValue('Example Description');
    component.formGroup.controls.image.setValue('ata:image/jpeg;base64,/9j/');

    // component.formGroup.setValue(addedCourse);
    expect(component.formGroup.valid).toBe(true);

    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith(['/courses']);
  });

  it('should call upload Image', () =>  {

      const mockReader: FileReader = jasmine.createSpyObj('FileReader', ['readAsDataURL', 'onload']);
      const mockFile = new File([''], 'filename', { type: 'text/jpg' });
      const object = {
      fileName: mockFile.name,
      fileType: mockFile.type
    };

      const mockEvt = { target: { files: [mockFile] } };

      spyOn(window as any, 'FileReader').and.returnValue(mockReader);

      component.insertImage(mockEvt);
      expect((window as any).FileReader).toHaveBeenCalled();
      expect(mockReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });

  it('should disable the button when form is empty', () => {
    expect(component.formGroup.valid).toBeFalsy();
    component.formGroup.controls.title.setValue('');
    component.formGroup.controls.description.setValue('');

    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('#addUpdateBtn').disabled;
    expect(button).toBeTrue();

  });
  // it('should ', () => {
  //
  //   // const course = {
  //   //    id: 1,
  //   //   title: 'Example',
  //   //   description: 'Desc',
  //   //   image: 'data:image/jpeg;base64,/9j/',
  //   // };
  //   // component.ngOnInit();
  //
  //   const service = TestBed.inject(CourseService);
  //   component.ngOnInit();
  //
  //   const course = {
  //     id: 1,
  //     title: 'Example Title',
  //     description: 'Example Description',
  //     image: 'ata:image/jpeg;base64,/9j/'
  //   };
  //   expect(course).toBeDefined();
  //    service.
  // });

  it('should enable button when form is not empty', () => {

    component.formGroup.controls.title.setValue('Example Title');
    component.formGroup.controls.description.setValue('Example Description');

    expect(component.formGroup.valid).toBeTrue();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#addUpdateBtn').disabled;
    expect(button).toBeFalse();

  });

  it('should unsubscribe after ngOnDestroy()', () => {
    fixture.detectChanges();
    spyOn(component.destroy$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.destroy$.unsubscribe).toHaveBeenCalled();

  });

});
