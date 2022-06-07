const playwright = require('playwright');

(async() => {
    for(const browserType of ['chromium']){
        const browser = await playwright[browserType].launch({
            headless: false
        });
    
    const context = await browser.newContext();
    const page = await context.newPage();

    //navigate to the page
    await page.goto("http://wordleeeee.azurewebsites.net/", {timeout:0} )
    await page.screenshot({path: `ea-${browserType}.png` })
    await page.browser.close();
    }
})();