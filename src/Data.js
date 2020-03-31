import { mockHyperlinks } from "./DataMock";

let _hyperlinks;

class Data {

	constructor() {
		_hyperlinks = [];
	}

	// Simulate existing data stored on a server
	initMockHyperlinks() {
		_hyperlinks = Object.assign({}, mockHyperlinks);  // make copy of mock data
	}

	// Simulate calls to server
	getHyperlinks() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}
	
	createHyperlink(hyperlink) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const id = this.generateUid();
				const newHyperlink = {
					id,
					...hyperlink,
					createdOn: this.getISOTimestamp()
				};
				const updatedHyperlinks = {
					..._hyperlinks,
					[id] : newHyperlink
				};
				_hyperlinks = updatedHyperlinks;

				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}
	
	updateHyperlink(hyperlink) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let updatedHyperlinks = {
					..._hyperlinks
				};
				updatedHyperlinks[hyperlink.id] = Object.assign(updatedHyperlinks[hyperlink.id], hyperlink);
				_hyperlinks = updatedHyperlinks;

				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}
	
	deleteHyperlink(hyperlink) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let updatedHyperlinks = {
					..._hyperlinks
				};
				delete updatedHyperlinks[hyperlink.id];
				_hyperlinks = updatedHyperlinks;

				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}

	getHyperlinksArraySorted() {
		return Object.entries(_hyperlinks).map(e => e[1]).sort(this.sortDescByISOTimestamp);
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
