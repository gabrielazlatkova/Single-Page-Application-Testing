import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {Component} from '@angular/core';
@Component({
  selector: 'app-header',
  template: ''
})
class HeaderMockComponent{
}
@Component({
  selector: 'app-main',
  template: ''
})
class MainMockComponent{

}
@Component({
  selector: 'app-footer',
  template: ''
})
class FooterMockComponent{
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderMockComponent,
        MainMockComponent,
        FooterMockComponent,
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();

  });

  it(`should have as title 'course-management-system'`, () => {
    expect(component.title).toEqual('course-management-system');
  });


});
