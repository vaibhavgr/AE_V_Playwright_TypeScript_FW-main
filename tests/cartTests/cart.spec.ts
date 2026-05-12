import { test } from '../../fixtures/baseTest';
import { existingUserEmail } from '../../test-data/userData';

test.only('verifyProductPage', async ({ loginPage, registrationPage }) => {
    const existingUser = existingUserEmail();
    await registrationPage.goto();
    await loginPage.verifyUserLogin(existingUser.existingEmail, existingUser.existingPassword);
    console.log("login successful");
    console.log("Hey its from main branch");
    console.log("Reject this PR");
})