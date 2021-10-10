import {CourseService} from './course.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const  expectedResponse = [
    {
      id: 1,
      title: 'Fundamentals of digital marketing',
      image: '',
      additionalDetails: {
        description: 'Master the basics of digital marketing with our free course . There are 26 modules to explore, packed full of practical exercises and real-world examples to help you turn knowledge into action.Learn step by step how to market a business online from scratch across all the major marketing channels.Follow the steps on screen to get results at work, for own business or for your digital marketing clients.',
        courseCode: 10
      }
    },
    {
      id: 2,
      title: 'Big Data',
      image: '',
      additionalDetails: {
        description: 'Learn how big data is driving organisational change and essential analytical tools and techniques, including data mining and PageRank algorithms.In this course, part of the Big Data MicroMasters program, you will learn how big data is driving organisational change and the key challenges organizations face when trying to analyse massive data sets.\n',
        courseCode: 20
      }
    },
    {
      id: 3,
      title: 'Machine Learning',
      image: '',
      additionalDetails: {
        description: 'Machine learning is the science of getting computers to act without being explicitly programmed.This course provides a broad introduction to machine learning, datamining, and statistical pattern recognition. Topics include: (i) Supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks). (ii) Unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning).\n',
        courseCode: 30
      }
    },
    {
      id: 4,
      title: 'Web Design: Be Responsive!',
      image: '',
      additionalDetails: {
        description: 'Make the jump to Responsive Design!By completing your own online portfolio, you will learn all the steps to design webs to leave the file prepared for the programmer, and you will also enter the \'Responisve Web Design\' or adaptive web design, the most used method currently that allows your Design suits all devices. Get away from the typical predesigned portfolios creating yours from scratch and who knows, this course can be the first step to dedicate yourself fully to web design or serve to complement your creative services.',
        courseCode: 40
      }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CourseService
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it('getCourses() should return data', () => {
      service.getCourses().subscribe((result) => {
        expect(result).toBeDefined();
        expect(result.length).toEqual(expectedResponse.length);
        // expect(result).toEqual(expectedResponse);
      });
      const request = httpMock.expectOne('http://localhost:3000/courses');
      expect(request.request.method).toBe('GET');
      request.flush(expectedResponse);
  });
  it('deleteCourses() should delete the data', () => {
       service.deleteCourse(2).subscribe();

       const request = httpMock.expectOne('http://localhost:3000/courses/2');
       expect(request.request.method).toBe('DELETE');
  });
  it('getCourse() should send a GET request and return a single course id ', () => {

    service.getCourse(1).subscribe((course ) => {
      expect(course).toBeDefined();
    });
    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('GET');
    req.flush({id: 1, title: 'Example title', description: 'Example Description', image: ''});
  });

  it('saveCourse() should send POST request if does not have id', () =>  {
    const exampleCourse = {
      id: null,
      title: 'Programming basics',
      description: 'Programming basic course with Java',
      image: ''
    };

    service.saveCourse(exampleCourse).subscribe();

    const testRequest = httpMock.expectOne('http://localhost:3000/courses');
    expect(testRequest.request.method).toBe('POST');
  });
  it('saveCourse() should send PUT request if have an id ', () => {
    const exampleCourse = {
      id: 1,
      title: 'Programming basics',
      description: 'Programming basic course with Java',
      image: ''
    };
    service.saveCourse(exampleCourse).subscribe();

    const testRequest = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(testRequest.request.method).toBe('PUT');
  });

  it('mapCourseItemToCourseResponse() should set courseCode to be 0 if there is no course id', () => {
    const course = {
      id: null,
      title: 'Example title',
      image: '',
      description: 'Example Description',
    };
    const actualCourse = service.mapCourseItemToCourseResponse(course);
    expect(actualCourse.additionalDetails.courseCode).toEqual(0);
  });

});


