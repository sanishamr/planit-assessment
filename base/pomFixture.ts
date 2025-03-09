import { test as baseTest } from '@playwright/test'
import Homepage from '../pages/homePage'
import Cartpage from '../pages/cartPage'
import ContactPage from '../pages/contactPage'
import ShopPage from '../pages/shopPage'

type pages = {
    homePage: Homepage;
    cartPage: Cartpage;
    contactPage: ContactPage;
    shopPage: ShopPage;

}

const testPages = baseTest.extend<pages>({

    homePage: async({page}, use)=> {
    await use(new Homepage(page));
},

cartPage: async ({ page} , use) => {
    await use(new Cartpage(page));
},

contactPage : async ({ page }, use) => {
        await use(new ContactPage(page));
    },

    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page));
        }
})

export const test = testPages;
export const expect = testPages.expect;
