import Data from '../../services/Data/Data';
import DataSync from './DataSync';

// mocks
import { mockLocalHyperlinks } from '../../services/DataLocal/DataLocalMock';
jest.mock('../../services/DataLocal/DataLocal');  // https://jestjs.io/docs/en/mock-functions#mocking-modules


describe('syncHyperlink()', () => {
	beforeEach(async () => {
		let hyperlinks = mockLocalHyperlinks.map(mockHyperlink => {
			mockHyperlink.dirty = true;
			return mockHyperlink;
		});
		await Data.initMockHyperlinks(hyperlinks);
	});
	
	afterEach(async () => {
		await Data.resetMockHyperlinks();
	});

	it('updates hyperlink with synced version', async () => {
		const hyperlinks = await Data.getHyperlinks();
		const hyperlink = hyperlinks[0];

		const syncedHyperlink = await DataSync.syncHyperlink(hyperlink);
		
		expect(syncedHyperlink.dirty).toBe(undefined);
		expect(syncedHyperlink.createdOn).not.toBe(syncedHyperlink.updatedOn);
	});

});