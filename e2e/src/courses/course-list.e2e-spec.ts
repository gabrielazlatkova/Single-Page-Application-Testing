import {CourseListPage} from './course-list.po';
import {add} from 'ngx-bootstrap/chronos';
import {browser, by, element} from 'protractor';
import {CourseCreateEditPage} from './course-create-edit.po';

describe('CourseListPage', () => {
  let page: CourseListPage;

  beforeEach(() => {
    page = new CourseListPage();
  });

  it('should display title Our Courses', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Our Courses');
  });

  it('should display a list of courses', async () => {
    await page.navigateTo();

    const elements = await page.getCourseCardElements();

    expect(elements.length).toBe(5);

  });
  it('should display add button with text "Add new course"', async () => {
    await page.navigateTo();
    const addButn = await page.getAddCourseButtonText();
    expect(addButn).toEqual('Add new course');
  });

  it('should navigate to Add course form',  () => {
    page.navigateTo().then(() => {
      element(by.id('#createRouter')).click().then(() => {

        browser.getCurrentUrl().then((url) => {
          expect(url).toEqual(`${browser.baseUrl}courses/create`);
        });
      });
    });
  });

  it('should add new course when add new course is clicked',  () => {
      // const createEditPage = new CourseCreateEditPage();
      // const addButon = element(by.id('#createRouter'));
      //
      // page.navigateTo().then(() => {
      //   addButon.click().then(() => {
      //
      //   });
      // });
    const createEditPage = new CourseCreateEditPage();
    page.navigateTo().then(() => {
       page.getAddNewCourseButtonElement().then((addButn) => {
         addButn.click();


         createEditPage.getSubmitButtonElement().then((submitButn) => {
           browser.ExpectedConditions.visibilityOf(submitButn);

           createEditPage.fillForm('End-to-End testing', 'E2E testing with Protractor', 'data:image/jpeg;base64,/9j');
           submitButn.click();

           page.getCourseCardElements().then((cardElements) => {
             cardElements.count().then((countElements) => {
               expect(countElements).toEqual(6);
             });
           });
          });
       });
     });
  });
  it('should display delete button and delete course when delete button is clicked', () => {
     page.navigateTo().then(() => {
       page.getDeleteButtonElement().then((deleteButn) => {
         deleteButn.isPresent().then((presentedDeleteBtn) => {
           expect(presentedDeleteBtn).toBe(true);
           deleteButn.click();

           page.getCourseCardElements().then((cardElements) => {
             cardElements.count().then((countEl) => {
               expect(countEl).toBe(4);
             });
           });
         });


       });
     });
  });

});
