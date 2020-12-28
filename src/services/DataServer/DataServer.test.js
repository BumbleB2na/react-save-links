import DataServer from './DataServer';

// mocks
import DataServerMock from '../../services/DataServer/DataServerMock';
import { mockLocalHyperlinks } from '../../services/DataLocal/DataLocalMock';

describe('getHyperlinks()', () => {
	it('gets hyperlinks when successful', async () => {
		// Arrange
		global.fetch = () => DataServerMock.mockGet();  // mock

		// Act
		const hyperlinks = await DataServer.getHyperlinks();
		
		// Assert
		expect(hyperlinks.length).not.toBe(0);
	});
});

describe('addOrUpdateHyperlink()', () => {
	it('alters a hyperlink the same as a server would', async () => {
		// Arrange
		const localHyperlink = Object.assign({ dirty: true }, mockLocalHyperlinks[0]);  // make copy that has "dirty: true"
		global.fetch = () => DataServerMock.mockAddOrUpdate(localHyperlink);  // mock

		// Act
		const syncedHyperlink = await DataServer.addOrUpdateHyperlink(localHyperlink);
		
		// Assert
		expect(syncedHyperlink.dirty).not.toBe(localHyperlink.dirty);
		expect(syncedHyperlink.updatedOn).not.toBe(localHyperlink.updatedOn);
	});
});

