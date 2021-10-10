import {browser, by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class CourseListPage{
  async navigateTo(): Promise<unknown>{
    return browser.get(`${browser.baseUrl}/courses`);
  }

  async getTitleText(): Promise<string>{
    return element(by.id('wrapperTitle')).getText();
  }

  async getAddCourseButtonText(): Promise<string>{
    return element(by.id('createRouter')).getText();
  }

  async getCourseCardElements(): Promise<ElementArrayFinder>{
    return element.all(by.id('courseItem'));
  }

  async getAddNewCourseButtonElement(): Promise<ElementFinder>{
    return element(by.id('createRouter'));
  }
  async getDeleteButtonElement(): Promise<ElementArrayFinder>{
    // return element(by.className('courseItemDelete')).element('deleteBtn');
    return element.all(by.id('deleteBtn')).first();

  }
  async getDeleteButtonText(): Promise<ElementArrayFinder>{

    return element.all(by.id('deleteBtn')).first();
  }
}
