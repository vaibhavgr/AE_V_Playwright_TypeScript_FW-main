import { test as base } from '@playwright/test';
import { RegistrationPage } from '../pageObject/RegistrationPage';
import { HomePage } from '../pageObject/HomePage';
import { ProductPage } from '../pageObject/ProductPage';
import { CartPage } from '../pageObject/CartPage'
import { APIUtil } from '../utils/apiUtils';
import { LoginPage } from '../pageObject/LoginPage';
import { ContactUsPage } from '../pageObject/ContactUsPage';


interface Fixtures {
    registrationPage: RegistrationPage;
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    cartPage: CartPage;
    contactUsPage: ContactUsPage;
    apiUtil: APIUtil

};

export const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
        await page.route('**/*', (route) => {
            const url = route.request().url();
            if (url.includes('google') || url.includes('doubleclick') || url.includes('ad')) {
                // simple block for automationexercise to prevent vignette ads
                if (url.includes('googlesyndication') || url.includes('doubleclick') || url.includes('googleads')) {
                    route.abort();
                    return;
                }
            }
            route.continue();
        });
        await use(page);
    },
    registrationPage: async ({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },
  loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
 contactUsPage: async ({ page }, use) => {
        const contactUsPage = new ContactUsPage(page);
        await use(contactUsPage);
    },

    apiUtil: async ({ request }, use) => {
        const apiUtil = new APIUtil(request);
        await use(apiUtil);
    }



});


