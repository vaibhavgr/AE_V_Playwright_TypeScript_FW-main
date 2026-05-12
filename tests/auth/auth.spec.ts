import { test } from '../../fixtures/baseTest';

import { getNewUSerData } from '../../test-data/userData';
import { invalidUserEmail } from '../../test-data/userData';
import { existingUserEmail } from '../../test-data/userData';

import { expect } from '@playwright/test';

test.describe('Auth Tests', () => {

    test('Register User', async ({ registrationPage, homePage, page }) => {
        const user = getNewUSerData();

        await registrationPage.goto()
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');

        await expect(registrationPage.newUserSignUpHeading).toBeVisible();
        await registrationPage.SignUpUser(user.userName, user.newUserEmailInputBox);
        await expect(registrationPage.enterAccountInfoText).toHaveText('Enter Account Information');

        await registrationPage.UserDetails(user);
        await registrationPage.verifyAccountCreated();
        await homePage.clickContinue();
        await expect(homePage.loggedInUser).toHaveText(new RegExp(`Logged in as\\s*${user.userName}`, 'i'));;
        await homePage.verifyAccountIsDeleted();
    });

    test('Login with valid credentials & DeleteUser', async ({ registrationPage, loginPage, homePage }) => {
        const validUserDeatils = getNewUSerData();
        await registrationPage.goto();
        await registrationPage.SignUpUser(validUserDeatils.userName, validUserDeatils.newUserEmailInputBox);
        await registrationPage.UserDetails(validUserDeatils);
        await homePage.clickContinue();
        await loginPage.verifyUserLogout();

        await loginPage.verifyUserLogin(validUserDeatils.newUserEmailInputBox, validUserDeatils.password)
        await expect(homePage.loggedInUser).toHaveText(new RegExp(`Logged in as\\s*${validUserDeatils.userName}`, 'i'));;
        await homePage.verifyAccountIsDeleted();
    });

    test('Login with valid credentials & LogOut', async ({ registrationPage, loginPage, homePage }) => { 
        const existingUser = existingUserEmail();
await registrationPage.goto();
await loginPage.verifyUserLogin(existingUser.existingEmail, existingUser.existingPassword);

    })

    test('Login with invalid credentials', async ({ registrationPage, loginPage }) => {
        const invalidUserDeatils = invalidUserEmail();
        await registrationPage.goto();
        await loginPage.verifyUserLogin(invalidUserDeatils.invalidEmail, invalidUserDeatils.password)
        await loginPage.verifyInvalidLoginMessage();
    });


    test('Register with existing email', async ({ registrationPage }) => {
        const existingUser = existingUserEmail();
        await registrationPage.goto();
        await registrationPage.SignUpUser(existingUser.userName, existingUser.existingEmail);
        await registrationPage.verifyExistingUserRegistration();
    });


});