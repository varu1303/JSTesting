const { JSDOM } = require("jsdom");
//
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
jest.dontMock('fs');

let document

describe('HTML Test', function () {
	beforeAll((done) => {
		jest.setTimeout(30000)
		let { window } = new JSDOM(html, { resources: 'usable', runScripts: 'dangerously' })
		window.addEventListener("load", () => {
			document = window.document.body;
			done();
		})
	});
	test('finds a node', () => {
		expect(document.querySelector('#react-hook').innerHTML).toBe('<h1>Hello JSX!!</h1>')
	});
});