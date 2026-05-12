import { expect, Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginEmail: Locator
    readonly loginPassword: Locator
    readonly loginBtn: Locator
    readonly logOut: Locator
    readonly incorrectEmail : Locator

    constructor(page: Page) {
        this.page = page;
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator(`//input[@name='password']`);
        this.loginBtn = page.locator(`button:has-text("Login")`);
        this.logOut = page.getByRole('link', { name: 'Logout' });
        this.incorrectEmail= page.getByText('Your email or password is incorrect!', { exact: true });
    }

    async verifyUserLogout() {
        await this.logOut.click();
    }

    async verifyUserLogin(email: string, password: string) {
        await this.loginEmail.fill(email)
        await this.loginPassword.fill(password)
        await this.loginBtn.click();
        
    }

    verifyInvalidLoginMessage(){
     expect(this.incorrectEmail).toBeVisible;
    }




}