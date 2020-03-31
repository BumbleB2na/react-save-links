import { mockHyperlinks } from "./DataMock";

// Retains data from server
let _hyperlinks;

// Simulate calls to server
class Data {
	constructor() {
		_hyperlinks = this.getMockHyperlinks();
	}

	// Simulate existing data stored on a server
	getMockHyperlinks() {
		return mockHyperlinks.slice();
	}

	getHyperlinks() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const hyperlinks = _hyperlinks.slice().sort(this.sortDescByISOTimestamp);
				resolve(hyperlinks);
			}, 500);
		});
	}

	sortDescByISOTimestamp(a, b) {
		return (a.createdOn > b.createdOn) ? -1 : ((a.createdOn < b.createdOn) ? 1 : 0);
	}
}

export default new Data();
