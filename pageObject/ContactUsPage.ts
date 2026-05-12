import { expect, Locator, type Page } from '@playwright/test';
import { contactUs, getContactUsData } from '../test-data/contactUsFormData';
export class ContactUsPage {
    readonly page: Page;
    readonly contactUsBtn: Locator
    readonly getIntouchHeading: Locator
    readonly contactName: Locator
    readonly contactEmail: Locator
    readonly subject: Locator
    readonly messageBox: Locator
    readonly chooseFile: Locator
    readonly sumitContactForm: Locator
    readonly successMessage: Locator

    constructor(page: Page) {

        this.page = page;
        this.contactUsBtn = page.getByRole('link', { name: 'Contact us' });
        this.getIntouchHeading = page.getByRole('heading', { name: 'Get In Touch' });
        this.contactName = page.locator('[data-qa="name"]');
        this.contactEmail = page.locator('[data-qa="email"]');
        this.subject = page.locator('[data-qa="subject"]');
        this.messageBox = page.getByPlaceholder('Your Message Here');
        this.chooseFile = page.locator(`//input[@name='upload_file']`);
        this.sumitContactForm = page.locator(`//input[@name='submit']`);
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
    }

    async verifyContactUsForm(contactUSdata: contactUs) {

        await this.page.goto('https://automationexercise.com/')
        await this.contactUsBtn.click();
        await expect(this.getIntouchHeading).toBeVisible();
        await this.contactName.fill(contactUSdata.contactName);
        await this.contactEmail.fill(contactUSdata.contactEmail);
        await this.subject.fill(contactUSdata.subject);
        await this.messageBox.fill(contactUSdata.messageBox);
        await this.chooseFile.setInputFiles('test-data/contactusFile.txt')
        await this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await this.sumitContactForm.click();
    }
    async verifyContactUsFormSubmition() {
      await  expect(this.successMessage).toBeVisible();
     await   expect(this.successMessage).toHaveText(/Success! Your details have been submitted successfully./)
    }
}
