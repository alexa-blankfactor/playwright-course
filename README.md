INSTALLING PLAYWRIGHT

npm install @playwright/test

install browsers

    npx playwright install

Run test

    npx playwright test

    npx playwright test --headed

    npx playwright test --browser=firefox

    npx playwright test --headed --browser=firefox

    npx playwright test --headed --browser=all

    npx playwright test tests/example.spec.ts

    npx playwright test --grep @myTag runing by tag

    npx playwright test --grep-invert @myTag only run the test witout the tag

    npx playwright test --config=playwright.config.ts --project=Webkit run with a specific project in the config

Selectors

    //text
    await page.click("text= come text");

    // css selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    //only visible css selectors

    await page.click('.submit-button:visible') // only button thata is visible

    // combination
    await page.click('#username .first')

    //xpath
    await page.click('//button')

Annotation

    test.skip()
    test.only()

    test.describe()  creat a suit of test

Run reporter

    npx playwright test --config=playwright.config.ts --project=Chromium --reporter=line
    npx playwright test --config=playwright.config.ts --project=Chromium --reporter=list
    npx playwright test --config=playwright.config.ts --project=Chromium --reporter=dot
    npx playwright test --config=playwright.config.ts --project=Chromium --reporter=junit
    npx playwright test --config=playwright.config.ts --project=Chromium --reporter=html

Screenshot

    full page
        await page.screenshot({path:"screenshot.png",fullPage:true})

    single element
        const element = await page.$('h1')
        await element.screenshot({path:"single_element_screenshot.png"})

RUN WITH npm

    npm run tests:firefox
    npm run tests:webkit -- --headed

INSPECTOR
await page.pause()

Parallel execution

    test.describe.parallel()

Update snapshot

npm run tests:visual:webkit -- --headed --update-snapshots

Framework for visual testing
percy-playwright

RUN JENKIS 

java -jar jenkins.war --httpPort=8080 --enable-future-java

Retries 

npx playwright test --config=playwright.config.ts --project=Chromium --retries=3

Device emulator 

npx playwright open  --device "iPhone 11" wikipedia.org

Convert page into pdf 
npx playwright pdf  https://www.example.com my-file.pdf

Generate customized screenshot 

npx playwright screenshot --device="iPhone 11" --color-scheme=dark --wait-for-timeout=3000  https://www.example.com my-image.png

Emulate timezone 

npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com

Custom report 
npx playwright test --reporter=reporter.ts
