const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

(async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    // devtools: true
  });

  page = await browser.newPage();


  const waitThenClick = ({ selector }) => {
    return page.waitForSelector(selector).then((el) => page.click(selector));
  };

  const waitThenClickShadow = async ({ selector, timeout }) => {
    const handle = await page.waitForFunction(
      function (selector) {
        try {
          // eslint-disable-next-line no-eval
          return eval(selector);
        } catch (e) {
          return false;
        }
      },
      { polling: 500 }, selector
    );
    await handle.click({});
  };

  const login = async () => {
    page.setDefaultTimeout(4000);

    page.on('console', (msg) => {
      for (let i = 0;i < msg.args().length;++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    await page.goto('http://localhost:3001/login');

    const USERNAME_SELECTOR = `document.querySelector('amplify-authenticator').shadowRoot.querySelector('amplify-sign-in').shadowRoot.querySelector('amplify-auth-fields').shadowRoot.querySelector('amplify-username-field').shadowRoot.querySelector('amplify-form-field').shadowRoot.querySelector('input')`,
      PASSWORD_SELECTOR = "document.querySelector('html')"
    await waitThenClickShadow({ selector: USERNAME_SELECTOR });
    await page.keyboard.type('test');

    await waitThenClickShadow({ selector: PASSWORD_SELECTOR });
    await page.keyboard.type('wonderboy');
    return Promise.all([
      page.keyboard.press(String.fromCharCode(13)),
      page.waitForNavigation()
    ])
  }

  const submitAVisit = async () => {
    // await waitThenClick({ selector: '#root > div > nav > button:nth-child(5) > a  span' });
    await page.goto("http://localhost:3001/addvisit");

    // const selectSelector = '#SelectField-1';
    // await page.waitForSelector(selectSelector);
    // // await page.select('select[name=clinic]', '5e016d700afaa520354490b2');
    // await page.select(selectSelector, '5e016d700afaa520354490b2');

    // await waitThenClick({
    //   selector:
    //     '#root > div > div > div > div > form > div:nth-child(8) > label:nth-child(2) > span',
    // });

    await page.click('[name=submitvisit]');
  };
  const fetchPicture = async (filename) => {
    await fetch('http://localhost:3001/api/receipt/' + filename)
      .then((result) => {
        console.log({ result });
        if (result.status === 200) return Promise.resolve('i guess it worked');
        return result.json().then(Promise.reject);
      })
      .then(console.log)
      .catch((error) => {
        console.log('did not work', error);
      });
  };

  await login();
  const options = await page.evaluate(() => {
    window.pglOptions.validate = false;
    window.pglOptions.prefill = true;
    return Promise.resolve(JSON.stringify(window.pglOptions));
  });
  await submitAVisit();
  // await fetchPicture();

})()
// fetchPicture('s30.54161459063557'); //test with invalid s3 filename
// fetchPicture('0.54161459063557'); //test with mongo filename that throws objectid error;
// fetchPicture('5e3065bef43200248c5053c8'); //test with mongo filename that is valid objectid but does not exist

// fetchPicture('s30.541641459063557'); //test with valid s3 filename
// fetchPicture('5e3065bef43200248c5053c9'); //test with valid mongo filename
// if it's a picture it's not json!
// run();
/*
 docker build -t jmetev/node-web-app .
 docker run -p 49160:8080 jmetev/node-web-app
 docker ps
*/
