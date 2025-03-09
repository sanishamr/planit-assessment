import  {Page, expect} from '@playwright/test'
export default class Homepage1{


    constructor(public page : Page){}

   /*async goto() {
        await this.page.goto('http://jupiter.cloud.planittesting.com');
      }
*/
      async navigateToContact() {
        const contactLink = await this.page.locator("text=Contact");
        //this.page.waitForTimeout(20000);
        await contactLink.click();
      }
    
      async navigateToCart() {
        const cartLink = await this.page.locator("#nav-cart");
        await cartLink.click();
      }

      async navigateToShop() {
        const shopLink = await this.page.locator("//li[@id='nav-shop']/a[1]");
        await shopLink.click();
      }

    }
    

    
