import DataLocal from "../../services/DataLocal/DataLocal";
import DataServer from "../../services/DataServer/DataServer"

class Data {

	constructor() {
		this.hyperlinks = {};
		this.ERROR = {
			CREATE: "Cannot create hyperlink because object already has an id property",
			UPDATE: "Cannot update hyperlink because object has no id property",
			DELETE: "Cannot delete hyperlink because object has no id property",
		};
	}

	getHyperlinks() {
		const sortedHyperlinks = this.getHyperlinksArraySorted().filter(hyperlink => !hyperlink.deleted);
		return sortedHyperlinks;
	}
	
	createHyperlink(hyperlink) {
		if(hyperlink.id) {
			throw new Error(this.ERROR.CREATE);
		}

		// update in-memory data
		const id = this.generateUid();
		const timestamp = this.getISOTimestamp();
		const newHyperlink = {
			id,
			...hyperlink,
			createdOn: timestamp,
			updatedOn: timestamp,
			dirty: true
		};

		this.updateSyncedHyperlink(newHyperlink);  // calling this to avoid repeated code
		return this.getHyperlinks();
	}
	
	updateHyperlink(hyperlink) {
		if(!hyperlink.id) {
			throw new Error(this.ERROR.UPDATE);
		}

		// update in-memory data
		let hyperlinks = {
			...this.hyperlinks
		};
		const timestamp = this.getISOTimestamp();
		const updatedHyperlink = {
			...hyperlinks[hyperlink.id],
			...hyperlink,
			dirty: true,
			updatedOn: timestamp
		}

		this.updateSyncedHyperlink(updatedHyperlink);  // calling this to avoid repeated code
		return this.getHyperlinks();
	}
	
	deleteHyperlink(hyperlink) {
		if(!hyperlink.id) {
			throw new Error(this.ERROR.DELETE);
		}

		// update in-memory data (piggyback on update)
		const deletedHyperlink = {
			...hyperlink,
			deleted: true
		}
		return this.updateHyperlink(deletedHyperlink);
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

	
	// FETCH AND SYNC

	async syncHyperlinks() {
		const unsyncedHyperlinks = this.getHyperlinksArraySorted().filter(hyperlink => hyperlink.dirty);
		for(var i = 0; i < unsyncedHyperlinks.length; i++) {
			const hyperlink = unsyncedHyperlinks[i];
			const syncedHyperlink = DataServer && await DataServer.addOrUpdateHyperlink(hyperlink);
			if(syncedHyperlink) {
				this.updateSyncedHyperlink(syncedHyperlink);
				DataLocal && await DataLocal.addOrUpdateHyperlink(syncedHyperlink);
			}
		}
		return this.getHyperlinks();
	}

	updateSyncedHyperlink(hyperlink) {
		// update in-memory data
		// add or update hyperlink
		const updatedHyperlinks = {
			...this.hyperlinks,
			[hyperlink.id]: { ...hyperlink }
		};
		this.hyperlinks = updatedHyperlinks;
	}

	async fetchHyperlinks() {
		await this.loadLocalHyperlinks();
		await this.loadServerHyperlinks();
		return this.getHyperlinks();
	}

	async loadLocalHyperlinks() {
		DataLocal && await DataLocal.initDb();
		const hyperlinks = DataLocal && await DataLocal.getHyperlinks();
		if(!hyperlinks)
			return;
		this.hyperlinks = hyperlinks;
	}

	async loadServerHyperlinks() {
		const hyperlinks = DataServer && await DataServer.getHyperlinks();
		if(!hyperlinks)
			return;
		this.hyperlinks = hyperlinks;

		// update local hyperlinks
		for(var i = 0; i < hyperlinks.length; i++) {
			const hyperlink = hyperlinks[i];
			DataLocal && await DataLocal.addOrUpdateHyperlink(hyperlink);
		}
	}

	// For testing -- unit, implementation or end-to-end
	async initMockHyperlinks(mockHyperlinks) {
		this.hyperlinks = mockHyperlinks;
		DataLocal && await this.loadLocalHyperlinks();
	}

	// For testing -- unit, implementation or end-to-end
	async resetMockHyperlinks() {
		DataLocal && await DataLocal.deleteDb();
		this.hyperlinks = {};
	}

}

export default new Data();
