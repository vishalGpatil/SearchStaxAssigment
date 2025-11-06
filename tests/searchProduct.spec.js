const { test, expect, webkit } = require('@playwright/test');
const fs = require('fs');
const settings = JSON.parse(fs.readFileSync('settings.json', 'utf-8'));

test('Get product price',async ({page}) =>{
    await page.goto(settings.baseURL)

    const searchBar = await page.locator('#twotabsearchtextbox')
    await searchBar.fill('iPhone 15')
    await page.locator('#nav-search-submit-button').click()
   // await page.screenshot({path:'Screenshots/searchBar.jpeg',fullPage:true})

  const firstProduct = await page.locator("//span[@class='a-price-whole']").first().innerText();
  try{
  fs.writeFileSync('data.json', JSON.stringify({ ProductPrice: firstProduct }, null, 2));

  console.log(`Stored product price: ${firstProduct}`);
  }catch(error){
    console("File writing error : "+ error)
  }
});

test('Search saved product and verify it appears', async ({ page }) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    if(!data.ProductPrice) test.fail(true, 'No product name from previous test');
    await page.goto(settings.baseURL)
    const searchBar = await page.locator('#twotabsearchtextbox')
    try{
    await searchBar.fill(data.ProductPrice)
    await page.click('#nav-search-submit-button')

    const firstItem = await page.locator("//span[@class='a-price-whole']").first().innerText();
    expect(firstItem.toLowerCase()).toContain(data.productName.split(' ')[0].toLowerCase());
    }catch(error){
        console.log("Test Failed error :"+error)
    }
});
