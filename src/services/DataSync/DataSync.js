import DataLocal from "../../services/DataLocal/DataLocal";
import DataServer from "../../services/DataServer/DataServer";

class DataSync {

	async syncHyperlink(unsyncedHyperlink) {
		let hyperlink = Object.assign({}, unsyncedHyperlink);  // make a copy
		if(!hyperlink.dirty)
			return;
		const syncedHyperlink = DataServer && await DataServer.addOrUpdateHyperlink(hyperlink);
		if(syncedHyperlink)
			if(syncedHyperlink.deleted)
				DataLocal && await DataLocal.deleteHyperlink(syncedHyperlink);
			else
				DataLocal && await DataLocal.addOrUpdateHyperlink(syncedHyperlink);
		return syncedHyperlink;
	}

}

export default new DataSync();
