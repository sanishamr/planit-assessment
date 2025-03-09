import {expect, test} from "../base/pomFixture"
import * as data from "../testData/test-data.json"

test.describe('Jupiter toy website validations', async () => {

test("Contact Page validations testcase_01", async({page, baseURL, homePage, contactPage}) => {

    //step 1: From the home page go to contact page
    await page.goto(`${baseURL}/home`);
    
    await homePage.navigateToContact();

    
    await contactPage.verifyContactPageHeader();
    
    
   // Step 2: Click submit button
   await contactPage.submitForm();
    
   // step 3: Verify error messages 
   // verify header error message
   await contactPage.verifyErrorMessage();

    //validation : Populate Non mandatory fields
    await contactPage.enterSurName(data.surname);
    await contactPage.enterTelephone(data.phone);
    await contactPage.submitForm();

  //header error message 
   await contactPage.verifyErrorMessage();
   //Verify foreName error message
   await contactPage.verifyForenameErrorMessage();
    //Verify Email error message
    await contactPage.verifyEmailErrorMessage();
     //Verify Message error message
   await contactPage.verifyMessageFieldErrorMessage();
   

    //Step 4: Populate mandatory fields 
    await contactPage.enterForeName(data.forename);
    await contactPage.enterEmail(data.email);
    await contactPage.enterMessageField(data.message);
    

    //Step 5: Validate errors are gone
    await contactPage.verifyContactPageHeader();
    
})

test("Contact Page validations testcase_02", async({page, baseURL, homePage,contactPage}) => {

    for (let i = 0; i < 5; i++) {
        console.log(`Running iteration: ${i + 1}`);

    //Step 1: From the home page go to contact page
    await page.goto(`${baseURL}/home`);
    
    await homePage.navigateToContact();

    
    await contactPage.verifyContactPageHeader();
    
    //Step 2: Populate mandatory fields
    await contactPage.enterForeName(data.forename);
    await contactPage.enterEmail(data.email);
    await contactPage.enterMessageField(data.message);
    
    //Step 3: Click submit button
    await contactPage.submitForm();

    //Step 5 : Validate successful submission message
    await contactPage.sendingFeedback();
    await contactPage.verifySuccessMessages();

    await page.waitForTimeout(5000);
    
}
})

test("Contact Page validations testcase_03", async({page, baseURL,homePage, cartPage, shopPage}) => {

//Pre req: From the home page go to shop page
    //await page.goto(`${baseURL}/shop`);
    await page.goto(`${baseURL}/home`);
    await homePage.navigateToShop();
    

    //const shop = new ShopPage(page);
    await shopPage.verifyShopPageLoaded();

    //Step 1 : Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear

      await shopPage.buyStuffedFrog(2);
      await shopPage.buyFluffyBunny(5);
      await shopPage.buyValentineBear(3);
     
      //Step 2: Go to the cart page
      
      cartPage.clickOnCart();
     // page.waitForTimeout(25000);
      cartPage.verifyCartHeaderMessage();

      //Step 3: Verify the subtotal for each product is correct
     cartPage.verifySubtotalCalculations();

      //Step 4: Verify the price for each product
      cartPage.verifyProductPrices();

      //Step 5: Verify that total = sum(sub totals)
      cartPage.verifyTotalPrice();

})



})


