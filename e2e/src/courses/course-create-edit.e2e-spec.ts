import {CourseCreateEditPage} from './course-create-edit.po';
import {browser, ExpectedConditions} from 'protractor';
import {types} from 'util';
import {summaryFileName} from '@angular/compiler/src/aot/util';

describe('', () => {
  let page: CourseCreateEditPage;

  beforeEach(() => {
    page = new CourseCreateEditPage();
  });

  it('should display title Create when creating a new course', async () => {
    await page.navigateToCreate();
    expect(await page.getTitleText()).toContain('Create');

  });
  it('should display title Update when updating course ',  () => {
     page.navigateToEdit().then(() => {
    page.getTitleText().then((title) => {
      expect(title).toEqual('Update');
    });
    });
  });

  it('should display previous button', async () => {
    await page.navigateToCreate();
    const butn = await page.getPreviousButtonElement();
    butn.isPresent().then((presentedButn) => {
      expect(presentedButn).toBeTrue();
    });
    // expect(butn.isPresent()).toBe(true);

  });
  it('should display submit button with text Add when creating a new course',  async () => {
   await page.navigateToCreate().then(() => {
      page.getSubmitButtonElement().then((button) => {
        expect(button).toBeDefined();

        page.getSubmitButtonText().then((text) => {
             expect(text).toEqual('Add');
          });
      });
    });
  });

  it('add button should be disabled if form is empty', () => {
    page.navigateToCreate().then(() => {
      page.getInputTitleElement().then((title) => {
        expect(title).not.toContain('');

        page.getInputDescriptionElement().then((description) => {
          expect(description).not.toContain('');

          page.getSubmitButtonElement().then((submitButton) => {
            submitButton.isEnabled().then((unabledButn) => {
              expect(unabledButn).not.toBe(true);
            });
            // expect(submitButton.isEnabled()).not.toBeTrue();
          });
        });
      });
    });
  });

  it('add button should be enable when form is not empty', () => {
     page.navigateToCreate().then(() => {
       page.fillForm('End-to-End course', 'End-to-End testing tools', 'data:image/jpeg');
       page.getSubmitButtonElement().then((submitBtn) => {
         submitBtn.isEnabled().then((enabledButn) => {
           expect(enabledButn).toBe(true);
         });
         // expect(submitBtn.isEnabled()).toBeTrue();
       });
     });

  });

  it('should go to course list when previous button is clicked', () => {
    page.navigateToCreate().then(() => {
      page.getPreviousButtonElement().then((previousButn) => {
        previousButn.click();

        browser.getCurrentUrl().then((url) => {
          expect(url).toEqual(`${browser.baseUrl}courses`);
        });
      });
    });
  });

  it('should display an minLength error message if title is less than 5 characters', () => {
    page.navigateToCreate().then(() => {
      page.getInputTitleElement().then((inputTitle) => {
        inputTitle.click();
        inputTitle.sendKeys('Exam');

        page.getMinLengthErrorMessage().then((minleghtError) => {
          expect(minleghtError).toEqual(' This field should contain at least 5 characters');
        });

      });
    });
  });

  it('should display an Required error message is fields are empty ', () => {
    page.navigateToCreate().then(() => {
      page.getInputTitleElement().then((inputTitle) => {
        inputTitle.click();

        page.getInputDescriptionElement().then((description) => {
        description.click();

        page.getInputImageElement().then((image) => {
        image.click();

        page.getRequiredErrorMessage().then((requiredError) => {
          expect(requiredError).toEqual('This field is required');
        });
      });
      });
      });
    });
  });
});
