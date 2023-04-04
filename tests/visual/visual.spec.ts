import { test, expect } from '@playwright/test'

test.describe('Visual regression testing', () => {
  test('Full Page Snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    expect(await page.screenshot()).toMatchSnapshot('homepage.png')
  })
  test('Single element snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    const title = await page.$('h1')
    expect(await title.screenshot()).toMatchSnapshot('page-title.png')
  })
})
