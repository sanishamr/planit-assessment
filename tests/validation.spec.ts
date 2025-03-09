import {test} from "@playwright/test"

import Homepage from "../pages/homePage"
import Cartpage from "../pages/cartPage"
import ContactPage from "../pages/contactPage"
import ShopPage from "../pages/shopPage"


const email = 'john.example@planit.net.au';
const forename = 'John';
const message = 'helo';
const phone ='02 1234 5678';
const surname ='Example';

test.describe('Jupiter toy validations', async () => {

test("Contact Page validations testcase_01", async({page, baseURL}) => {

    //step 1: From the home page go to contact page
    await page.goto(`${baseURL}/home`);
    const home =new Homepage(page);
    await home.navigateToContact();

    const contact =new ContactPage(page);
    await contact.verifyContactPageHeader();
    
   // Step 2: Click submit button
   await contact.submitForm();
    
   // step 3: Verify error messages 
   // verify header error message
   await contact.verifyErrorMessage();

    //validation : Populate Non mandatory fields
    await contact.enterSurName(surname);
    await contact.enterTelephone(phone);
    await contact.submitForm();

  //header error message 
   await contact.verifyErrorMessage();
   //Verify foreName error message
   await contact.verifyForenameErrorMessage();
    //Verify Email error message
    await contact.verifyEmailErrorMessage();
     //Verify Message error message
   await contact.verifyMessageFieldErrorMessage();
   

    //Step 4: Populate mandatory fields 
    await contact.enterForeName(forename);
    await contact.enterEmail(email);
    await contact.enterMessageField(message);
    

    //Step 5: Validate errors are gone
    await contact.verifyContactPageHeader();
    
})

test("Contact Page validations testcase_02", async({page, baseURL}) => {

    for (let i = 0; i < 5; i++) {
        console.log(`Running iteration: ${i + 1}`);

    //Step 1: From the home page go to contact page
    await page.goto(`${baseURL}/home`);
    const home =new Homepage(page);
    await home.navigateToContact();

    const contact =new ContactPage(page);
    await contact.verifyContactPageHeader();
    
    //Step 2: Populate mandatory fields
    await contact.enterForeName(forename);
    await contact.enterEmail(email);
    await contact.enterMessageField(message);
    
    //Step 3: Click submit button
    await contact.submitForm();

    //Step 5 : Validate successful submission message
    await contact.sendingFeedback();
    await contact.verifySuccessMessages();

    await page.waitForTimeout(5000);
    
}})

test("Contact Page validations testcase_03", async({page, baseURL}) => {

//Pre req: From the home page go to shop page
    await page.goto(`${baseURL}/shop`);
    const home =new Homepage(page);
    await home.navigateToShop();
    

    const shop = new ShopPage(page);
    await shop.verifyShopPageLoaded();

    //Step 1 : Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear

      await shop.buyStuffedFrog(2);
      await shop.buyFluffyBunny(5);
      await shop.buyValentineBear(3);
     
      //Step 2: Go to the cart page
      const cart = new Cartpage(page);
      cart.clickOnCart();
      cart.verifyCartHeaderMessage();

      //Step 3: Verify the subtotal for each product is correct
      cart.verifySubtotalCalculations();

      //Step 4: Verify the price for each product
      cart.verifyProductPrices();

      //Step 5: Verify that total = sum(sub totals)
      cart.verifyTotalPrice();

})



})


