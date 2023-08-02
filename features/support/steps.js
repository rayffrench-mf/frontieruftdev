const { Given, When, Then, BeforeAll, Before, AfterAll, After, setDefaultTimeout } = require("@cucumber/cucumber");
var LFT = require("leanft");
var expect = require("leanft/expect");
var verify = require("leanft/verify");
var Web = LFT.Web;
var assert = require("assert");
const { Verify, createVerify } = require("crypto");


// Timeout required since cucumber tests time out after 5000ms
// and some UFTd async operation might take longer than that.
setDefaultTimeout(20 * 1000);

var browser;
var browserName = process.env.LFT_BROWSER || "Chrome";

// All the hooks below are required in every UFTd JS test.
// Initializes the UFTd JS SDK and optionally starts the runtime engine if 
// it isn't running already.
BeforeAll(async function () {
    await LFT.init();
});

Before(async function () {  
    await LFT.beforeTest();
    browser = await Web.Browser.launch(Web.BrowserType[browserName]);
});

After(async function () {
    await LFT.afterTest();

    if (browser) {
        await browser.close();
    }
});

// SDK cleanup.
AfterAll(async function () {
    await LFT.cleanup();
});

// All UFTd operations are asynchroneous.
// Instantiation of UFTd test objects like the one below is not:
// var speakersCategoryLink = browser.$(Web.Link({
//     tagName: "DIV",
//     innerText: "SPEAKERS Shop Now "
// }));

Given('I navigate to {string}',
    async function (myURL) {
             await browser.navigate(myURL);
             await browser.sync();
            });             

When('I click the {string} button',
    async function (mybutton) {
          		var loginButton = browser.$(Web.Button({
				buttonType: "submit",
                name: mybutton,
				tagName: "BUTTON"
			}));
        await loginButton.click();

             });

Then('the message {string} is shown',
    async function (mymessage) {
                var usernameIsRequiredWebElement1 = browser.$(Web.Element({
			   className: "ng-binding",
				 innerText: "Username is required"
               }));


     await verify(usernameIsRequiredWebElement1.innerText()).toContain(mymessage);
                           
    });



