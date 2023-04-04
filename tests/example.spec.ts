import { test, expect } from '@playwright/test'
import { loadHomePage, assetTitle } from '../helpers'

test.describe.parallel.only('My first test suit', () => {
  test('Simple basic test', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
  })

  test('Clickin on Elements', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')

    await page.type('#user_login', 'some username')
    await page.type('#user_password', 'some password')

    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Assertions @myTag', async ({ page }) => {
    await page.goto('https://www.example.com')

    await expect(page).toHaveURL('https://www.example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const noExistingElement = await page.locator('h5')
    await expect(noExistingElement).not.toBeVisible()
  })
})

test.describe('hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.example.com')
  })
  test('Screensshot', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  test('single element screenshot', async ({ page }) => {
    const element = await page.$('h1')
    await element.screenshot({ path: 'single_element_screenshot.png' })
  })
})

test('Custom Helpers', async ({ page }) => {
  await loadHomePage(page)
  //await page.pause()
  await assetTitle(page)
})
