import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;


    component.course = {
      id: 1,
      title: 'Chemistry course',
      description: 'This course will cover the topics of a full year, two semester General Chemistry course.',
      image: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined course', () => {
    expect(component.course).toBeDefined();
  });

  it('should emit favourite course when markAsFavourite() is called', () => {
       const expectedCourse = {
         id: 1,
         title: 'Chemistry course',
         description: 'This course will cover the topics of a full year, two semester General Chemistry course.',
         image: ''
       };
       const spy = spyOn(component.courseClicked, 'emit');
       component.markAsFavourite();
       expect(spy).toHaveBeenCalledWith(expectedCourse);
  });

  it(`should have as title 'Chemistry course'`, () => {
    const cardTitle = fixture.componentInstance;
    expect(cardTitle.course.title).toEqual('Chemistry course');
  });

  it('should render title in h5 tag', () => {
    const compile = fixture.nativeElement;
    expect(compile.querySelector('h5').textContent).toContain('Chemistry course');
  });

  it('should emit when delete button is clicked', () => {
    const id = 1;
    const spy = spyOn(component.courseDeleted, 'emit');
    const deleteButn = fixture.nativeElement.querySelector('#deleteBtn');
    deleteButn.click();
    expect(spy).toHaveBeenCalledWith(id);
  });




});
