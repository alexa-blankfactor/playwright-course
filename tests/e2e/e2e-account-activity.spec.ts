import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Filter transaction', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    await homePage.visit()
    await homePage.clickOnSignInButton()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/account-activity.html')
  })

  test('Verify the result for each account', async ({ page }) => {
    await page.selectOption('#aa_accountId', '2')
    const checking = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(checking).toHaveCount(3)
    await page.selectOption('#aa_accountId', '4')
    const loan = await page.locator('#all_transactions_for_account tbody tr')
    await expect(loan).toHaveCount(2)
    await page.selectOption('#aa_accountId', '6')
    const brokerageResult = await page.locator('.well')
    await expect(brokerageResult).toContainText('No results.')
  })
})
