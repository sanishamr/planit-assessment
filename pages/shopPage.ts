import  {Page, expect} from '@playwright/test'
import exp from 'constants';
export default class ShopPage{


    constructor(public page : Page){}
    
    async verifyShopPageLoaded() {
        const shopPage = await this.page.locator("div.products.ng-scope");
        await expect(shopPage).toBeVisible();
     }

    async enterForeName(forename :string) {
       await this.page.locator("#forename").fill(forename);
    }

    async buyStuffedFrog(times: number) {
       const stuffedFrog = await this.page.locator("//h4[normalize-space(text())='Stuffed Frog']");
       await expect(stuffedFrog).toBeVisible(); 
        const buyButtonStuffedFrog = await this.page.locator("//*[@id='product-2']/div/p/a");
        for (let i = 0; i < times; i++) {
            await buyButtonStuffedFrog.click();
          }
    }


    async buyFluffyBunny(times: number) {
        const fluffyBunny = await this.page.locator("//h4[normalize-space(text())='Fluffy Bunny']");
        await expect(fluffyBunny).toBeVisible();
         const buyButtonFluffyBunny = await this.page.locator("//*[@id='product-4']/div/p/a");
        
         for (let i = 0; i < times; i++) {
            await buyButtonFluffyBunny.click();
          }
     }
 
    
     async buyValentineBear(times: number) {
        const valentineBear = await this.page.locator("//h4[normalize-space(text())='Valentine Bear']");
        await expect(valentineBear).toBeVisible();
         const buyButtonValentineBear = await this.page.locator("//*[@id='product-7']/div/p/a");
         for (let i = 0; i < times; i++) {
            await buyButtonValentineBear.click();
          }
        
     }

}