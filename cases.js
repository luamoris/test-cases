/* ======================================================== */

const Puppeteer = require('puppeteer');

const TIMEOUT = 1000;

/* ========================================================
	TEST CASE 1
=========================================================== */

async function testCase_1(headless) {
	const link = 'https://www.google.com/';
	// ===
	const browser = await Puppeteer.launch({ headless });
	const page = await browser.newPage();
	await page.setViewport({ width: 1400, height: 1080 })
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
	const res =  await page.evaluate(() => {
		const testSubject = 'Якість та тестування програмного забезпечення';
		const listDay = document.querySelectorAll('#ctl00_MainContent_FirstScheduleTable tr');
		for(const arrDay of listDay) {
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
	return true;
}

/* ========================================================
	TEST CASE 3
=========================================================== */

async function testCase_3(headless) {
	return true;
}

/* ======================================================== */

module.exports = {
	testCase_1,
	testCase_2,
	testCase_3,
};
