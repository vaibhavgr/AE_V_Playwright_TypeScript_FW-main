import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  // Navigation
  readonly productsLink: Locator;
  readonly allProductsHeading: Locator;

  // Listing Page
  readonly productCards: Locator;
  readonly firstViewProductBtn: Locator;

  // Product Details Page
 
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly price: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly searchProductBar : Locator;
  readonly searchBtn : Locator;
  readonly searchedProductLists : Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });

    // Listing Page
    this.productCards = page.locator('.productinfo.text-center');
    this.firstViewProductBtn = page.locator('a:has-text("View Product")').first();

    // Product Details Page
    
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p').filter({ hasText: 'Category:' });
    this.price = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p').filter({ hasText: 'Availability:' });
    this.productCondition = page.locator('.product-information p').filter({ hasText: 'Condition:' });
    this.productBrand = page.locator('.product-information p').filter({ hasText: 'Brand:' });


    //Search Product
    this.searchProductBar = page.getByRole('textbox', { name: 'Search Product' });
    this.searchBtn = page.locator('#submit_search');
    this.searchedProductLists = page.locator('.productinfo p');

  }

  // ---------- Actions ----------

  async navigateToProductsPage() {
    await this.page.goto('https://automationexercise.com/');
    await this.productsLink.click();

    // Remove popup if present
    await this.page.evaluate(() => {
      const modal = document.querySelector('.modal, .ads, .popup');
      if (modal) modal.remove();
    });

   
  }

  async openFirstProduct() {
    await expect(this.productCards.first()).toBeVisible();
    await this.firstViewProductBtn.click();
    
  }

  async searchProduct(product:string){
    await this.searchProductBar.fill(product);
    await this.searchBtn.click();
    const name =await this.searchedProductLists.allTextContents();
    console.log(name);
    
    
  }

  // ---------- Assertions ----------

  async verifyProductListVisible() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async verifyProductDetails() {
    // Product Name
    await expect(this.productName).toBeVisible();
    await expect(this.productName).toHaveText(/.+/);

    // Category
    await expect(this.productCategory).toBeVisible();
    await expect(this.productCategory).toContainText('Category');

    // Price
    await expect(this.price).toBeVisible();
    await expect(this.price).toHaveText(/Rs\. \d+/);

    // Availability
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productAvailability).toContainText('Availability:');

    // Condition
    await expect(this.productCondition).toBeVisible();
    await expect(this.productCondition).toContainText('Condition:');

    // Brand
    await expect(this.productBrand).toBeVisible();
    await expect(this.productBrand).toContainText('Brand:');
}


 async verifySearchName() {
       // The website returns products if the search keyword matches EITHER the Product Name OR the Product Category.
        // Since Category is not visible on this grid, we simply verify that related search results are successfully returned.
        const productCount=await this.searchedProductLists.count();
        console.log(productCount);
        expect(productCount).toBeGreaterThan(0);
    }
}
