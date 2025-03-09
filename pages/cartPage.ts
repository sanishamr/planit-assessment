import  {Page, expect} from '@playwright/test'
export default class Cartpage1{


    constructor(public page : Page){}


    async clickOnCart() {
    const cart =await this.page.locator("#nav-cart");
    cart.click();
    }


    async verifyCartHeaderMessage() {
        const cartHeader = await this.page.locator(".cart-msg");
       //expect(cartHeader).toContainText("There");
    }


    async verifyProductPrices() {
        const productPrices = await this.page.locator("tr.cart-item td:nth-child(2)").allInnerTexts();
        for (const price of productPrices) {
          console.log("price of items :", price);
          expect(parseFloat(price.replace('$', ''))).toBeGreaterThan(0);
        }
      }
    
      async verifySubtotalCalculations() {
        //const cartRows = this.page.locator("tr.cart-item");
        const cartRows = this.page.locator("(//tr[@class='cart-item ng-scope'])");
        
        
        /*
        const rows = await cartRows.count();
        for (let i = 0; i < rows; i++) {

         // const unitPriceText = await this.page.locator("//table[contains(@class,'table table-striped')]/tbody[1]/tr[i]/td[2]").innerText();
         // const quantityText = await this.page.locator("//table[contains(@class,'table table-striped')]/tbody[1]/tr[i]/td[3]/input[1]").getAttribute('value');
         // const subtotalText = await this.page.locator("//table[contains(@class,'table table-striped')]/tbody[1]/tr[2]/td[4]").innerText();
         */

         const rowCount = await cartRows.count(); // Get total cart items

         for (let i = 0; i < rowCount; i++) {
          const row = cartRows.nth(i); // Select each row
    
          // Locate quantity, price, and subtotal fields
          //const quantityText = await row.locator("td:nth-child(2) input").inputValue();
          //const priceText = await row.locator("td:nth-child(3)").textContent();
         // const subtotalText = await row.locator("td:nth-child(4)").textContent();

          const priceText = await this.page.locator("//table[contains(@class,'table table-striped')]/tbody[1]/tr[i]/td[2]").inputValue();
         const quantityText = await this.page.locator("//table[contains(@class,'table table-striped')]/tbody[1]/tr[i]/td[3]/input[1]").innerText();
          const subtotalText = await this.page.locator("//table[contains(@class,'table table-striped')]/tbody[1]/tr[2]/td[4]").inputValue();
          console.log("Unit price is :", priceText);
          console.log("quantityText  is :", quantityText);
          console.log("subtotalText is :", subtotalText);

          // Convert to numeric values
      const quantity = parseInt(quantityText, 10);
      const price = parseFloat(priceText?.replace("$", "") || "0");
      const subtotal = parseFloat(subtotalText?.replace("$", "") || "0");

      // Calculate expected subtotal
      const expectedSubtotal = quantity * price;

      // Assert the subtotal is correct
      expect(subtotal).toBeCloseTo(expectedSubtotal, 2); // Allow minor floating point differences
    }   
      }
    
async verifyTotalPrice() {

    const cartRows = await this.page.locator("tbody tr"); // Locate all cart rows
    const totalPriceLocator = await this.page.locator("strong.total.ng-binding").allInnerTexts(); // Locate total price element
   
    
    for (const price of totalPriceLocator) {
      console.log("price of items :", price);
      expect(parseFloat(price.replace('$', ''))).toBeGreaterThan(0);
      const displayedTotal = parseFloat(price.replace("Total: $", "").trim());
      console.log("displayed : ", displayedTotal);
      
    }
    //const displayedTotalText = await totalPriceLocator.innerText();
    
        const rowCount = await cartRows.count(); // Get total cart items
    let calculatedTotal = 0;
    

    for (let i = 0; i < rowCount; i++) {
      const row = cartRows.nth(i); // Select each row

       // Wait until the row's subtotal field is visible
       //await expect("//table[contains(@class,'table table-striped')]/tbody[1]/tr[i]/td[4]")
       
       const quantity = await this.page.locator("//th[normalize-space(text())='Quantity']");
        expect(quantity).toBeVisible({ timeout: 5000 });

       //await expect(row.locator("td:nth-child(4)")).toBeVisible({ timeout: 5000 });

      // Get subtotal value
      const subtotalText = await row.locator("//table[contains(@class,'table table-striped')]/tbody[1]/tr[i]/td[4]").innerText();

      // Ensure subtotal is valid
      if (!subtotalText || !subtotalText.includes("$")) {
        throw new Error(`Error: Could not extract valid subtotal from row ${i + 1}`);
      }

      const subtotal = parseFloat(subtotalText.replace("$", "").trim());
      calculatedTotal += subtotal;
    }
    
  }
}


