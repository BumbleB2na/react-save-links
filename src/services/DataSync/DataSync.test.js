import Data from '../../services/Data/Data';
import DataSync from './DataSync';

// mocks
import '@testing-library/jest-dom/extend-expect';
import DataLocalMock from '../../services/DataLocal/DataLocal';
jest.mock('../../services/DataLocal/DataLocal');  // https://jestjs.io/docs/en/mock-functions#mocking-modules


describe('syncHyperlink()', () => {
	beforeEach(async () => {
		await Data.initMockHyperlinks({
			"3dbd8r9v65gy0iyzrgdyr" : {
				id: "3dbd8r9v65gy0iyzrgdyr",
				title: "Example.com",
				url: "https://example.com",
				visited: false,
				createdOn: "2020-03-31T01:11:11.948Z",
				updatedOn: "2020-03-31T01:11:11.948Z",
				dirty: true
			}
		});
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