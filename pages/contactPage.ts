import  {Page, expect} from '@playwright/test'
export default class ContactPage1{


    constructor(public page : Page){}
    
    async verifyContactPageHeader() {
        const contactPageTitle = await this.page.locator("//div[@id='header-message']//div[1]");
        //const header = contactPageTitle.textContent();
        //console.log("contact page header is :" ,header);
        await expect(contactPageTitle).toHaveText('We welcome your feedback - tell it how it is.');
       // await expect(contactPageTitle).toBeVisible();
     }

    async enterForeName(forename :string) {
       await this.page.locator("#forename").fill(forename);
    }

    async enterSurName(surname :string) {
       await this.page.locator("#surname").fill(surname);
    }

    async enterEmail(email :string) {
        await this.page.locator("#email").fill(email);
     }

    async enterTelephone(telephone :string) {
        await this.page.locator("#telephone").fill(telephone);
     }


    async enterMessageField(message :string) {
        await this.page.locator("#message").fill(message);
     }

    
    async verifyErrorMessage() {
    const errorMessage= await this.page.locator(".alert.alert-error");
        await expect(errorMessage).toBeVisible();
       }

    async verifyForenameErrorMessage() {
        const forenameErrorMessage= await this.page.locator("//input[@name='forename']/following-sibling::span[1]");
            await expect(forenameErrorMessage).toBeVisible();
           }   

    /*async verifyForenameErrorMessageGone() {
        const forenameErrorMessage= await this.page.locator("//input[@name='forename']/following-sibling::span[1]");
            await expect(forenameErrorMessage).not.toBeVisible();
               }  */

    async verifyEmailErrorMessage() {
        const emailErrorMessage= await this.page.locator("//input[@id='email']/following-sibling::span[1]");
            await expect(emailErrorMessage).toBeVisible();
               }   
    
   /* async verifyEmailErrorMessageGone() {
                const emailErrorMessage= await this.page.locator("//input[@id='email']/following-sibling::span[1]");
                    await expect(emailErrorMessage).not.toBeVisible();
                       }                  
    */
    async verifyMessageFieldErrorMessage() {
        const messageFieldErrorMessage= await this.page.locator("//textarea[@name='message']/following-sibling::span[1]");
            await expect(messageFieldErrorMessage).toBeVisible();}

    /*async verifyMessageFieldErrorMessagGone() {
        const messageFieldErrorMessage= await this.page.locator("//textarea[@name='message']/following-sibling::span[1]");
            await expect(messageFieldErrorMessage).not.toBeVisible();    
                       }
    */                   
    async submitForm() {
       const submitButton = await this.page.locator("//a[contains(@class,'btn-contact btn')]");
        //await expect(submitButton).toBeVisible();
        await submitButton.click();
      }

      async sendingFeedback() {
        const feedback= await this.page.locator("//div[@class='modal-body']/following-sibling::div[1]");
            await expect(feedback).toBeVisible();
           }

    async verifySuccessMessages() {
        const successMessages= await this.page.locator("//div[@class='alert alert-success']");
            await this.page.waitForTimeout(20000);
            await expect(successMessages).toBeVisible();
            await expect(successMessages).toContainText('we appreciate your feedback.');
           }

    }