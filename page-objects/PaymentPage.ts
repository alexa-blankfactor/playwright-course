import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage {
  readonly page: Page
  readonly paySelectBox: Locator
  readonly payDetailsButton: Locator
  readonly payDetail: Locator
  readonly accountSelectBox: Locator
  readonly amount: Loacador
  readonly dateInput: Locator
  readonly descriptionInput: Locator
  readonly paymentButton: Locator
  readonly message: Locator

  constructor(page: Page) {
    this.page = page
    this.paySelectBox = page.locator('#sp_payee')
    this.payDetailsButton = page.locator('#sp_get_payee_details')
    this.payDetail = page.locator('#sp_payee_details')
    this.accountSelectBox = page.locator('#sp_account')
    this.amount = page.locator('#sp_amount')
    this.dateInput = page.locator('#sp_date')
    this.descriptionInput = page.locator('#sp_description')
    this.paymentButton = page.locator('#pay_saved_payees')
    this.message = page.locator('#alert_content > span')
  }

  async createPayment() {
    await this.paySelectBox.selectOption('apple')
    await this.payDetailsButton.click()
    await expect(this.payDetail).toBeVisible()
    await this.accountSelectBox.selectOption('6')
    await this.amount.type('100')
    await this.dateInput.type('2023-01-24')
    await this.descriptionInput.type('some message')
    await this.paymentButton.click()
  }

  async assertSuccessMessage() {
    await expect(this.message).toBeVisible()
    await expect(this.message).toContainText(
      'The payment was successfully submitted.'
    )
  }
}
