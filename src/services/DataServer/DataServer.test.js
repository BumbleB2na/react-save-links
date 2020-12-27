import DataServer from './DataServer';

// mocks
import { mockGet, mockAddOrUpdate } from '../../services/DataServer/DataServerMock';

describe('getHyperlinks()', () => {
	it('gets hyperlinks when successful', async () => {
		// Arrange
		global.fetch = () => mockGet();  // mock

		// Act
		const hyperlinks = await DataServer.getHyperlinks();
		
		// Assert
		expect(hyperlinks.length).not.toBe(0);
	});
});

describe('addOrUpdateHyperlink()', () => {
	it('alters a hyperlink the same as a server would', async () => {
		// Arrange
		const localHyperlink = {
			id: "c5yl1u4cfi64tvbgu66wbl",
			title: "Test",
			url: "https://example.com",
			visited: true,
			createdOn: "2020-03-31T03:33:33.333Z",
			updatedOn: "2020-03-31T03:33:33.333Z",
			dirty: true
		};
		global.fetch = () => mockAddOrUpdate(localHyperlink);  // mock

		// Act
		const syncedHyperlink = await DataServer.addOrUpdateHyperlink(localHyperlink);
		
		// Assert
		expect(syncedHyperlink.dirty).not.toBe(localHyperlink.dirty);
		expect(syncedHyperlink.updatedOn).not.toBe(localHyperlink.updatedOn);
	});
});

