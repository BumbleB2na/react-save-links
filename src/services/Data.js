import DataLocal from "./DataLocal";
import { mockHyperlinks } from "./DataMock";

class Data {

	constructor() {
		this.hyperlinks = {};
		this.ERROR = {
			CREATE: "Cannot create hyperlink because object already has an id property",
			UPDATE: "Cannot update hyperlink because object has no id property",
			DELETE: "Cannot delete hyperlink because object has no id property",
		};
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
			if(hyperlink.id) {
				reject(new Error(this.ERROR.CREATE));
				return;
			}
			setTimeout(async () => {
				const id = this.generateUid();
				const newHyperlink = {
					id,
					...hyperlink,
					createdOn: this.getISOTimestamp()
				};
				const updatedHyperlinks = {
					...this.hyperlinks,
					[id] : newHyperlink
				};
				this.hyperlinks = updatedHyperlinks;
				
				DataLocal && await DataLocal.addOrUpdateHyperlink(newHyperlink);

				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}
	
	async updateHyperlink(hyperlink) {
		return new Promise((resolve, reject) => {
			if(!hyperlink.id) {
				reject(new Error(this.ERROR.UPDATE));
				return;
			}
			setTimeout(async () => {
				let updatedHyperlinks = {
					...this.hyperlinks
				};
				updatedHyperlinks[hyperlink.id] = Object.assign(updatedHyperlinks[hyperlink.id] || {}, hyperlink);
				this.hyperlinks = updatedHyperlinks;

				DataLocal && await DataLocal.addOrUpdateHyperlink(updatedHyperlinks[hyperlink.id]);

				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}
	
	async deleteHyperlink(hyperlink) {
		return new Promise((resolve, reject) => {
			if(!hyperlink.id) {
				reject(new Error(this.ERROR.DELETE));
				return;
			}
			setTimeout(async () => {
				let updatedHyperlinks = {
					...this.hyperlinks
				};
				delete updatedHyperlinks[hyperlink.id];
				this.hyperlinks = updatedHyperlinks;

				DataLocal && await DataLocal.deleteHyperlink(hyperlink.id);

				const sortedHyperlinks = this.getHyperlinksArraySorted();
				resolve(sortedHyperlinks);
			}, 500);
		});
	}

	getHyperlinksArraySorted() {
		return Object.entries(this.hyperlinks).map(e => e[1]).sort(this.sortDescByISOTimestamp);
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
		const hyperlinks = DataLocal && await DataLocal.getHyperlinks();
		if(!hyperlinks)
			return;
		this.hyperlinks = hyperlinks;
	}

	// For testing
	async initMockHyperlinks() {
		DataLocal && await this.loadLocalHyperlinks();
		for (const mockHyperlinkId in mockHyperlinks) {
			if(!mockHyperlinks.hasOwnProperty(mockHyperlinkId))
				continue;
			const mockHyperlink = mockHyperlinks[mockHyperlinkId];
			await this.updateHyperlink(mockHyperlink);
		}
	}
	// For testing
	async resetMockHyperlinks() {
		DataLocal && await DataLocal.deleteIndexedDb();
		this.hyperlinks = {};
	}

}

export default new Data();
