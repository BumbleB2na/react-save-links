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
	
	createHyperlink(hyperlink) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const newHyperlink = Object.assign({}, hyperlink);  // make copy of data
				newHyperlink["id"] = this.generateUid();
				newHyperlink["createdOn"] = this.getISOTimestamp();
				_hyperlinks = _hyperlinks.concat([
					newHyperlink
				]);
				const hyperlinks = _hyperlinks.slice().sort(this.sortDescByISOTimestamp);
				resolve(hyperlinks);
			}, 500);
		});
	}

	// generate simple unique identifier
	generateUid() {
		var uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		return uid;
	}

	getISOTimestamp() {
		return (new Date()).toISOString();
	}

	sortDescByISOTimestamp(a, b) {
		return (a.createdOn > b.createdOn) ? -1 : ((a.createdOn < b.createdOn) ? 1 : 0);
	}
}

export default new Data();
