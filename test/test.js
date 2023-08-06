const {Builder, By, Key, until} = require("selenium-webdriver");
const assert = require("assert");


describe("Test Case for goodreads.com", function(){
    it("Testing website flow of goodreads.com", async function(){
       
        // Set the email ID you want to use for the test
       const emailId = "rav040002@gmail.com";

        let driver = await new Builder().forBrowser("firefox").build();  

// Step: 1 - Open the website using the URL
        await driver.get("https://www.goodreads.com/")


        // Validate the landing page after opening the website
        var title = await driver.getTitle();         
        assert.strictEqual(title, "Goodreads | Meet your next favorite book");


// Step: 2 - Click on the "Sign In" button
        const loginButton  = await driver.findElement(By.linkText('Sign In')); 
        loginButton.click();


// Step: 3 - Click on the "Sign In with email" button
        await driver.wait(until.elementLocated(By.css('.authPortalSignInButton')), 5000);    
        const signInWithEmail  = await driver.findElement(By.css(`.authPortalSignInButton`)); 
        signInWithEmail.click();

// Step: 4 - Fill in the email and password fields and Sign In
        await driver.wait(until.elementLocated(By.id('ap_email')), 5000); 
        await driver.findElement(By.id('ap_email')).sendKeys(emailId);

        await driver.wait(until.elementLocated(By.id('ap_password')), 5000);  
        await driver.findElement(By.id('ap_password')).sendKeys('test123!@#', Key.RETURN); 

        await driver.wait(until.urlContains('https://www.goodreads.com'), 5000);

        const profileUrl = await driver.getCurrentUrl();
        // Check if the login was successful and the user profile is found
        assert.ok(profileUrl.includes('https://www.goodreads.com'), 'Login failed: User profile not found.');

// Step: 5 - Search for a particular book after successful login
      await driver.wait(until.elementLocated(By.css("[placeholder='Search books']")), 5000);
      const searchInput = await driver.findElement(By.css("[placeholder='Search books']"));
      await searchInput.sendKeys('Stars', Key.RETURN);

// Step: 6 - Select the book from the search results
      await driver.wait(until.elementLocated(By.css("[alt='The Fault in Our Stars']")), 10000);
      const bookSelect  = await driver.findElement(By.css("[alt='The Fault in Our Stars']")); 
        bookSelect.click();

// Step: 7 - Add the book to the "WANT TO READ" section
        await driver.wait(until.elementLocated(By.css(`[aria-label="Tap to shelve book as want to read"]`)), 5000);
        const bookDetails  = await driver.findElement(By.css(`[aria-label="Tap to shelve book as want to read"]`)); 
        bookDetails.click();

        // Close the toast after adding the book to the shelf
        await driver.wait(until.elementLocated(By.css('.Toastify__close-button')), 10000);
        const toast  = await driver.findElement(By.css('.Toastify__close-button'));   
        toast.click();

// Step: 8 - Open "MY BOOKS"
        await driver.wait(until.elementLocated(By.linkText('My Books')), 5000);
        const mybooks  = await driver.findElement(By.linkText('My Books'));   
        mybooks.click();

// Step: 9 - Remove the book from the shelf
        await driver.wait(until.elementLocated(By.css('[data-confirm="Are you sure you want to remove The Fault in Our Stars from your books? This will permanently remove this book from your shelves, including any review, rating, tags, or notes you have added. To change the shelf this book appears on please edit the shelves."]')), 5000);
        const remove  = await driver.findElement(By.css('[data-confirm="Are you sure you want to remove The Fault in Our Stars from your books? This will permanently remove this book from your shelves, including any review, rating, tags, or notes you have added. To change the shelf this book appears on please edit the shelves."]'));   //class target
        remove.click();
        
        await driver.sleep(1200); // Give sleep timer to get the alert properly
        await driver.switchTo().alert().accept(); // Accept the alert, so that the book will be removed from the shelf successfully


// Step: 10 - Open the profile dropdown to LOGOUT from the site
        const myprofile  = await driver.findElement(By.css('.dropdown__trigger--profileMenu'));
        myprofile.click();

        // Click on the "Sign out" button
        const signOutButton = await driver.wait(until.elementLocated(By.linkText('Sign out')),10000);
        await signOutButton.click();

      await driver.quit(); //Close the driver

    });
});