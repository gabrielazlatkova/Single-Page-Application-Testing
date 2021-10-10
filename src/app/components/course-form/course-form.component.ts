import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Course} from '../models/course.interface';
import {CourseService} from '../../services/course.service';
import {switchMap, take, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {of, Subject} from 'rxjs';
import * as saveAs from 'file-saver';
import {File} from '@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system';
import compile = WebAssembly.compile;

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {

  imageFile = '';

  constructor(private fb: FormBuilder,
              private courseService: CourseService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.course = {
      title: '',
      description: '',
      image: ''
    };


  }
  @Output() courseSubmitted = new EventEmitter<Course>();

  course: Course;

  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();



  ngOnInit(): void {
    this.activatedRoute.params.pipe(
     switchMap((param) => {
       if (param.id){
       return this.courseService.getCourse(param.id);
       // console.log(this.courseService.getCourse(param.id));
       }
       return of(null);
  }), takeUntil(this.destroy$)).subscribe((course) => {
  if (course){
    this.course = course;
    this.imageFile = course.image;
  }
  this.formGroup = this.fb.group({
    id: this.course.id,
    title: [this.course.title, [Validators.required, Validators.minLength(5)]],
    description: [this.course.description, [Validators.required]],
    image: [this.imageFile]

  });

  // console.log(this.formGroup.value);

});
  }

ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  insertImage(e: any): void {
    let name = '';
    let type = '';
    const reader = new FileReader();

    if (e.target.files && e.target.files.length)
    {
      name = e.target.name;
      type = e.target.type;
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageFile = reader.result as string;
      //  console.log(reader.result);
        this.formGroup.patchValue({imgSrc: reader.result});

      };
    }
  }


  onSubmit(): void{
    const newCourse = {
      ...this.formGroup.value
    };

    newCourse.image = this.imageFile;

    // console.log(newCourse);
    this.courseService.saveCourse(newCourse).pipe(take(1)).
    subscribe(() => {
      this.router.navigate(['/courses']);
    }, error => {
      console.log(error);
    });
  }





}
