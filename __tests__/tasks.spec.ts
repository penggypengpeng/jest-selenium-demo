import { Builder, By, WebDriver } from 'selenium-webdriver';

import 'selenium-webdriver/chrome';
import 'chromedriver';

import { getElementById, getElementByXPath } from '../utils';

const rootURL = "http://localhost:3000";

let driver: WebDriver;

// Setup
beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build()
});

// Teardown
afterAll(() => {
    driver.quit();

    // if there's a way to revert the database, do that here.
});

describe('a simple test case', () => {
    it('initializes the context', () => {
        driver.get(rootURL); // get is an http method
    });

    it('checks whether the title appears up top', async () => {
        // get the element that we want

        // you can use getElementById
        const titleElement = await getElementById('title', driver);

        const text = await titleElement.getText();
        const expected = "Todo List App";

        expect(text).toEqual(expected);
    })
});

describe('create a task', () => {
    it('initializes the context', () => {
        driver.get(rootURL); // get is an http method
    });

    it('succesfully adds a task', async () => {
        // you can give the button an id

        // you can access the element using the xpath
        const addButton = await getElementByXPath('/html/body/main/div[1]/div/button', driver);
        await addButton.click();

        const textField = await getElementByXPath('/html/body/main/div[1]/div/div/div/form/div/input', driver);
        await textField.sendKeys('Wash my dog');

        const submitButton = await getElementByXPath('/html/body/main/div[1]/div/div/div/form/div/button', driver);
        await submitButton.click();

        const resultArea = await getElementByXPath('/html/body/main/div[2]/table/tbody/tr[3]/td[1]', driver);
        const text = await resultArea.getText();

        const expected = "Wash my dog";
        expect(text).toEqual(expected);
    });
});

describe('delete a task', () => {
    it('initializes the context', () => {
        driver.get(rootURL); // get is an http method
    });

    it('succesfully deletes a task', async () => {
        const trashButton = await getElementByXPath('/html/body/main/div[2]/table/tbody/tr[3]/td[2]/div[2]', driver);

        trashButton.click();

        const confirmButton = await getElementByXPath('/html/body/main/div[2]/table/tbody/tr[3]/td[2]/div[3]/div/div/button', driver);

        confirmButton.click();

        await driver.actions().pause(1000).perform();
        
        const tableBody = await getElementByXPath('/html/body/main/div[2]/table/tbody', driver);
        const noOfChildren = (await tableBody.findElements(By.xpath("tr"))).length;

        const expected = 2;

        expect(noOfChildren).toEqual(expected);
    });
})

// setup
// setting the webdriver

// invocation
// opening the website and doing what we want to do

// assessment
// checking whether something is present

// teardown
// if ever our testcase manipulated the database, we MUST make sure that the database reverts back to its original state