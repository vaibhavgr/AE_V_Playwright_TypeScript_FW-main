import { test } from '../../fixtures/baseTest';

test('verifyProductPage', async ({ productPage}) => {
 await productPage.navigateToProductsPage();
  await productPage.verifyProductListVisible();
  await productPage.openFirstProduct();
  await productPage.verifyProductDetails();

  

})

