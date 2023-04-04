export async function loadHomePage(page) {
  await page.goto('https://www.example.com')
}

export async function assetTitle(page) {
  await page.waitForSelector('h1')
}
