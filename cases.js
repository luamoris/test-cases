/* ======================================================== */

const Puppeteer = require('puppeteer');

const TIMEOUT = 1000;

/* ========================================================
	TEST CASE 1
=========================================================== */

async function testCase_1(headless) {
	const link = 'https://www.google.com/';
	// ===
	const browser = await Puppeteer.launch({
		headless
	});
	const page = await browser.newPage();
	await page.setViewport({
		width: 1400,
		height: 1080
	})
	// ===
	await page.goto(link);
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('input[name="q"]');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.keyboard.type('Розклад КПІ');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('input[name="btnK"]');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('.g a');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('#ctl00_MainContent_ctl00_txtboxGroup');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.keyboard.type('КП-92');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.focus('#ctl00_MainContent_ctl00_btnShowSchedule');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('#ctl00_MainContent_ctl00_btnShowSchedule');
	await page.waitForTimeout(TIMEOUT)
	// ===
	const res = await page.evaluate(() => {
		const testSubject = 'Якість та тестування програмного забезпечення';
		const listDay = document.querySelectorAll('#ctl00_MainContent_FirstScheduleTable tr');
		for (const arrDay of listDay) {
			const item = arrDay.children[3];
			const subject = item.querySelector('.disLabel');
			if (subject && subject.innerText.includes(testSubject)) {
				return true;
			}
		}
		return false;
	});
	// ===
	await page.waitForTimeout(1000)
	await browser.close();
	return res;
}

/* ========================================================
	TEST CASE 2
=========================================================== */

async function testCase_2(headless) {
	const link = 'https://www.google.com/';
	const test = "з 07:30 до 22:30";
	const browser = await Puppeteer.launch({
		headless
	});
	const page = await browser.newPage();
	await page.setViewport({
		width: 1400,
		height: 1080
	}) // ===
	await page.goto(link);
	await page.waitForTimeout(TIMEOUT)

	await page.click('.gLFyf');
	await page.waitForTimeout(TIMEOUT);
	await page.keyboard.type("епіцентр");
	await page.waitForTimeout(TIMEOUT);
	await page.keyboard.press('Enter');
	await page.waitForTimeout(TIMEOUT);
	await page.click('.cfxYMc');
	await page.waitForTimeout(TIMEOUT);
	await page.click('.header__info-menu');
	await page.waitForTimeout(TIMEOUT);
	await page.click('.is-red');
	await page.waitForTimeout(TIMEOUT);
	const j = await page.evaluate(() => {
		if (!document.querySelector(".company__content h3")) {
			return '';
		} else {

			return document.querySelector(".company__content h3").innerText;
		}
	});
	// ===
	await page.waitForTimeout(TIMEOUT);
	await browser.close();
	return j.includes(test);
}

/* ========================================================
	TEST CASE 3
=========================================================== */

async function testCase_3(headless) {
	const link = 'https://www.google.com/';
	const searchText = 'Ви отримаєте бонусні гривні на ваш рахунок протягом 7 днів після публікації відгуку на сайті.';
	// ===
	const browser = await Puppeteer.launch({
		headless
	});
	const page = await browser.newPage();
	await page.setViewport({
		width: 1400,
		height: 1080
	})
	// ===
	await page.goto(link);
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('input[name="q"]');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.keyboard.type('Розетка');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('input[name="btnK"]');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('.g a');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('.button.button--medium.button--with-icon.main-links__help');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.click('#title_bonus');
	await page.waitForTimeout(TIMEOUT)
	// ===
	await page.evaluate(() => {
		const item = document.querySelectorAll('.article-list .article-list-item')[0];
		item.querySelector('.article-list-link').click();
	});
	await page.waitForTimeout(TIMEOUT)
	// ===
	const res = await page.evaluate(() => {
		const textEl = document.querySelector('.article-content');
		return textEl ? textEl.innerText : '';
	} );
	await page.waitForTimeout(TIMEOUT)
	// ===
	await browser.close();
	// ===
	return res.includes(searchText);
}

/* ======================================================== */

module.exports = {
	testCase_1,
	testCase_2,
	testCase_3,
};