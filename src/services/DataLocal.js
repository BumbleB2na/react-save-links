import { openDB, deleteDB } from 'idb';  // https://github.com/jakearchibald/idb

const DATABASE_NAME = 'savelinksforlater';  // when user is not logged in then this is what could be used or, we could just not use persistent storage at all and skip this entirely.
// const DATABASE_NAME = 'savelinksforlater - user@email.com - guid-for-security';
const DATABASE_VERSION = 2;
let _db;

class DataLocal {

	async getHyperlinks(loadMockData = false) {
		await this.initIndexedDb(loadMockData);
		const hyperlinksArray = _db && await _db.getAllFromIndex('hyperlinks', 'createdOn');
		return hyperlinksArray && this.convertArrayToObject(hyperlinksArray);
	}

	async addOrUpdateHyperlink(hyperlink) {
		_db && await _db.put('hyperlinks', hyperlink);
	}

	async deleteHyperlink(id) {
		_db && await _db.delete('hyperlinks', id);
	}

	async initIndexedDb() {
		var isIDBInitializedOrNotSupported = (_db || !('indexedDB' in window));
		if(isIDBInitializedOrNotSupported)
			return;
		
		const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
			upgrade(upgradeDb, oldVersion, newVersion, transaction) {
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
							autoIncrement: false,  // false to use value of 'id' parameter
						});
						store.createIndex('id', 'id');
						store.createIndex('title', 'title');
						store.createIndex('url', 'url');
						store.createIndex('visited', 'visited');
						store.createIndex('createdOn', 'createdOn');
				}
			},
			blocked() {
				// …
			},
			blocking() {
				// …
			},
			terminated() {
				// …
			},
		});

		_db = db;
	}

	async deleteIndexedDb() {
		_db && await deleteDB(DATABASE_NAME, {
			blocked() {
			  	// …
			},
		});
	}

	// turn array of objects in to key-value object
	convertArrayToObject(array, keyName) {
		let objects = {};
		for(var i = 0; i < array.length; i++) {
			const object = Object.assign({}, array[i]);  // make copy of object
			objects[object[keyName]] = object;
		}
		return objects;
	}
}

export default new DataLocal();