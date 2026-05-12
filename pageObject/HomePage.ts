import { expect, Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly continueBtn: Locator
    readonly loggedInUser: Locator
    readonly deleteAccount: Locator
    readonly accountDeletedTxt: Locator
    constructor(page: Page) {
        this.page = page;
        this.continueBtn = page.getByRole('link', { name: 'Continue' });
        this.loggedInUser = page.locator('a:has-text("Logged in as")');
        this.deleteAccount = page.locator(`//a[normalize-space()='Delete Account']`);
        this.accountDeletedTxt = page.locator(`//b[normalize-space()='Account Deleted!']`);

    }

    async clickContinue() {
        await this.continueBtn.click();
    }

    async verifyAccountIsDeleted() {
        await this.deleteAccount.click();
        await expect(this.accountDeletedTxt).toBeVisible();
        this.clickContinue();
    }
}