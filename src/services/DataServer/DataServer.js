import DataServerMock from '../../services/DataServer/DataServerMock';

// Simulate calls to server
class DataServer {

	async getHyperlinks() {
		try {
			const response = await DataServerMock.mockGet(500);
			const data = await response.json();
			if(data.status && data.status !== 200) {
				throw new Error(data.title || "");
			}
			return data;
		}
		catch(error) {
			throw new Error(error);
		}
	}

	async addOrUpdateHyperlink(hyperlink) {
		try {
			const response = await DataServerMock.mockAddOrUpdate(hyperlink, 500);
			const data = await response.json();
			if(data.status && data.status !== 200) {
				throw new Error(data.title || "");
			}
			return data.find(h => h.id === hyperlink.id);		
		}
		catch(error) {
			throw new Error(error);
		}
	}

}

export default new DataServer();