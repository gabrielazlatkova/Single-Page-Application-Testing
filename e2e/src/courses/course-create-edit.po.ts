import {browser, by, element, ElementFinder} from 'protractor';

export class CourseCreateEditPage{
  async navigateToCreate(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/courses/create`);
  }

  async navigateToEdit(): Promise<unknown>{
    return browser.get(`${browser.baseUrl}/courses/edit/:id`);
  }

  async getTitleText(): Promise<string>{
    return element(by.id('createEditTitle')).getText();
  }

  async getPreviousButtonElement(): Promise<ElementFinder>{
    return element(by.className('previous'));
  }

  async getSubmitButtonText(): Promise<string> {
    return element(by.id('addUpdateBtn')).getText();
  }
  async getSubmitButtonElement(): Promise<ElementFinder>{
    return element(by.id('addUpdateBtn'));
  }
  async getInputTitleElement(): Promise<ElementFinder>{
    return element(by.id('title'));
  }
  async getInputDescriptionElement(): Promise<ElementFinder>{
    return element(by.id('description'));
  }
  async getInputImageElement(): Promise<ElementFinder>{
    return element(by.id('image'));
  }

  async fillForm(title: string, description: string, image: string): Promise<void>{
    element(by.id('title')).sendKeys(title);
    element(by.id('description')).sendKeys(description);
    element(by.id('image')).sendKeys(image);

  }
  async getMinLengthErrorMessage(): Promise<string>{
    return element(by.css('.error-minlength')).getText();
  }

  async getRequiredErrorMessage(): Promise<string>{
    return element(by.css('.error-required')).getText();
  }
}
