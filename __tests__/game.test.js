'use strict'

const { chromium } = require('playwright')

let browser
let page

// Needs to be higher than the default Playwright timeout
jest.setTimeout(40 * 1000)

beforeAll(async () => {
   browser = await chromium.launch()
})

afterAll(async () => {
   await browser.close()
})

beforeEach(async () => {
   page = await browser.newPage()
})

afterEach(async () => {
   await page.close()
})

describe('Game page tests for elements', () => {
  test('Game page opens', async () => {
     await page.goto('http://wordleeeee.azurewebsites.net/')
     expect(await page.title()).toBe('Competitive Wordle Sign In')
  })

  test('test if sign up page has the expected title', async () => {
    await page.goto('http://wordleeeee.azurewebsites.net/signup')
    expect(await page.title()).toBe('Competitive Wordle Sign Up')
  });

  test('test if screen page has the expected title', async () => {
    await page.goto('http://wordleeeee.azurewebsites.net/screen')
    expect(await page.title()).toBe('Wordle')
  });

  test('test if multiplayer page has the expected title', async () => {
    await page.goto('http://wordleeeee.azurewebsites.net/multiplayer')
    expect(await page.title()).toBe('Wordle')
  });

  
})
