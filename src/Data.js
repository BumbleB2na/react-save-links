import DataLocal from "./DataLocal";
import { mockHyperlinks } from "./DataMock";

let _hyperlinks;

class Data {

	constructor() {
		_hyperlinks = {};
	}
	// Simulate calls to server
	async getHyperlinks() {
		await this.loadLocalHyperlinks();

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}
	
	async createHyperlink(hyperlink) {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
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
				
				DataLocal && await DataLocal.addOrUpdateHyperlink(newHyperlink);

				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}
	
	async updateHyperlink(hyperlink) {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				let updatedHyperlinks = {
					..._hyperlinks
				};
				updatedHyperlinks[hyperlink.id] = Object.assign(updatedHyperlinks[hyperlink.id], hyperlink);
				_hyperlinks = updatedHyperlinks;

				DataLocal && await DataLocal.addOrUpdateHyperlink(updatedHyperlinks[hyperlink.id]);

				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}
	
	async deleteHyperlink(hyperlink) {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				let updatedHyperlinks = {
					..._hyperlinks
				};
				delete updatedHyperlinks[hyperlink.id];
				_hyperlinks = updatedHyperlinks;

				DataLocal && await DataLocal.deleteHyperlink(hyperlink.id);

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

	async loadLocalHyperlinks() {
		if(DataLocal) {
			let hyperlinks = {};
			await DataLocal.initIndexedDb();
			const hyperlinksArray = await DataLocal.getHyperlinks();
			for(var i = 0; i < hyperlinksArray.length; i++) {
				const hyperlink = Object.assign({}, hyperlinksArray[i]);  // make copy of object
				hyperlinks[hyperlink.id] = hyperlink;
			}
			_hyperlinks = hyperlinks;
		}
	}

	// For testing
	initMockHyperlinks() {
		_hyperlinks = Object.assign({}, mockHyperlinks);  // make copy of mock data
	}

}

export default new Data();
