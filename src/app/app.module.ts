import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseListWrapperComponent } from './components/course-list-wrapper/course-list-wrapper.component';
import {HttpClientModule} from '@angular/common/http';
import {Route, RouterModule} from '@angular/router';

const routes: Route[] = [
  {
    path: 'courses',
    component: CourseListWrapperComponent
  },
  {
    path: 'courses/create',
    component: CourseFormComponent
  },
  {
    path: 'courses/edit/:id',
    component: CourseFormComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  }
];

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    MainComponent,
    FooterComponent,
    CourseListComponent,
    CourseItemComponent,
    CourseFormComponent,
    CourseListWrapperComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
