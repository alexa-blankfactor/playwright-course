import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Purchase foreign currency', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    await homePage.visit()
    await homePage.clickOnSignInButton()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
  })

  test('purchase foreign currency cash', async ({ page }) => {
    await page.click('a[href="#ui-tabs-3"]')
    await page.selectOption('#pc_currency', 'CAD')
    const sellRateMesg = await page.locator('#sp_sell_rate')
    await expect(sellRateMesg).toBeVisible()
    await page.type('#pc_amount', '100')
    await page.click('#pc_calculate_costs')
    await page.click('input[id="pc_inDollars_true"]')
    const conversionAmount = await page.locator('#pc_conversion_amount')
    await expect(conversionAmount).toBeVisible()
    await page.click('#purchase_cash')
    const alertContent = await page.locator('#alert_content')
    await expect(alertContent).toContainText(
      'Foreign currency cash was successfully purchased.'
    )
  })
})
