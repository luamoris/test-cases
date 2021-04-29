/* ======================================================== */

const tests = require('./cases');

/* ========================================================
	MAIN
=========================================================== */

async function start(arrFun) {
	for(const fun of Object.keys(tests)) {
		const res = await arrFun[fun](false);
		console.log(`${fun}: ${res}`);
	}
}

start(tests);
