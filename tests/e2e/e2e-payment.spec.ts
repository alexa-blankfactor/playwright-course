import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { PaymentPage } from '../../page-objects/PaymentPage'

test.describe('New payment', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page)

    await homePage.visit()
    await homePage.clickOnSignInButton()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
  })

  test('Submit payment', async ({ page }) => {
    await paymentPage.createPayment()
    await paymentPage.assertSuccessMessage()
  })
})
