import { mockGet, mockAddOrUpdate } from '../../services/DataServer/DataServerMock';

// Simulate calls to server
class DataServer {

	async getHyperlinks() {
		const response = await mockGet(500);
		const hyperlinks = await response.json();
		return hyperlinks;
	}

	async addOrUpdateHyperlink(hyperlink) {
		const response = await mockAddOrUpdate(hyperlink, 500);
		const hyperlinks = await response.json();
		return hyperlinks && hyperlinks.find(h => h.id === hyperlink.id);
	}

}

export default new DataServer();