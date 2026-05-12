import { test } from '../fixtures/baseTest';

import { getContactUsData } from '../test-data/contactUsFormData';

test('verifyConatctUsPage', async ({ contactUsPage}) => {
    const contactUSdata = getContactUsData();
  await contactUsPage.verifyContactUsForm(contactUSdata);
  await contactUsPage.verifyContactUsFormSubmition();

});