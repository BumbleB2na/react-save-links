import { openDB } from 'idb';  // https://github.com/jakearchibald/idb

const DATABASE_NAME = 'savelinksforlater';
const DATABASE_VERSION = 2;
let _db;

class DataLocal {

	constructor() {
		this.initIndexedDb();
	}

	async getHyperlinks() {
		return await _db.getAllFromIndex('hyperlinks', 'createdOn');
	}

	async addOrUpdateHyperlink(hyperlink) {
		await _db.put('hyperlinks', hyperlink);
	}

	async deleteHyperlink(id) {
		await _db.delete('hyperlinks', id);
	}

	async initIndexedDb() {
		const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
			upgrade(upgradeDb, oldVersion) {
				/* tslint:disable */
				switch (oldVersion) {
					case 0:
						// a placeholder case so that the switch block will
						// execute when the database is first created
						// (oldVersion is 0)
					case 1:
						// init version 1 of hyperlinks store
						const store = upgradeDb.createObjectStore('hyperlinks', {
							keyPath: 'id',
							autoIncrement: false,
						});
						store.createIndex('id', 'id');
						store.createIndex('title', 'title');
						store.createIndex('url', 'url');
						store.createIndex('visited', 'visited');
						store.createIndex('createdOn', 'createdOn');
				}
			}
		});
		
		_db = db;
	}
}

export default new DataLocal();