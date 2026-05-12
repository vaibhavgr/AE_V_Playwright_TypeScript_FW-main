import { expect } from 'allure-playwright';
import { test } from '../../fixtures/baseTest';
test('verifyProductPage', async ({ productPage }) => {
  await productPage.navigateToProductsPage();
  await productPage.verifyProductListVisible();

  //Search the product by name
  const product = 'jeans';

  await productPage.searchProduct(product);
  await productPage.verifySearchName();
  


})






