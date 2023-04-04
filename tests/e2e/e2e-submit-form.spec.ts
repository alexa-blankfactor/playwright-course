import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe('Feedback form', () => {
  let feedbackPage: FeedbackPage
  let homePage: HomePage
  test.beforeEach(async ({ page }) => {
    feedbackPage = new FeedbackPage(page)
    homePage = new HomePage(page)
    await homePage.visit()
    await homePage.clickOnFeedbackLink()
  })

  test('Reset feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'some name',
      'some email',
      'some subject',
      'some comments'
    )
    await feedbackPage.resetForm()
    await feedbackPage.assertReset()
  })
  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'some name',
      'some email',
      'some subject',
      'some comments'
    )
    await feedbackPage.submitForm()
    await feedbackPage.feedbackFormSent()
  })
})
