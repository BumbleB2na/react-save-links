import Data from '../../services/Data/Data';
import DataSync from './DataSync';

// mocks
import { mockLocalHyperlinks } from '../../services/DataLocal/DataLocalMock';
import DataServerMock from '../DataServer/DataServerMock';
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
		// Arrange
		const hyperlinks = await Data.getHyperlinks();
		const hyperlink = hyperlinks[0];
		global.fetch = () => DataServerMock.mockAddOrUpdate(hyperlink);

		// Act
		const syncedHyperlink = await DataSync.syncHyperlink(hyperlink);
		
		// Assert
		expect(syncedHyperlink.dirty).toBe(undefined);
		expect(syncedHyperlink.createdOn).not.toBe(syncedHyperlink.updatedOn);
	});

	it('handles non-success response', async () => {
		const hyperlinks = await Data.getHyperlinks();
		const hyperlink = hyperlinks[0];
		global.fetch = () => DataServerMock.mockAddOrUpdate(hyperlink);  // mock fetch in case it gets used later
		jest.spyOn(DataServerMock, 'mockAddOrUpdate').mockImplementationOnce(() =>
			Promise.resolve({
				json: () => Promise.resolve({ status: 401, title: 'Unauthorized' }),
			})
		);

		try {
			await DataSync.syncHyperlink(hyperlink)
		}
		catch(error) {
			expect(error).toBeTruthy();
		}
	});

	it('handles rejection', async () => {
		const hyperlinks = await Data.getHyperlinks();
		const hyperlink = hyperlinks[0];
		global.fetch = () => DataServerMock.mockAddOrUpdate(hyperlink);  // mock fetch in case it gets used later
		jest.spyOn(DataServerMock, 'mockAddOrUpdate').mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.reject('Rejected'),
			})
		);
		// fetch.mockImplementationOnce(() => Promise.reject("API is down"));

		try {
			await DataSync.syncHyperlink(hyperlink)
		}
		catch(error) {
			expect(error).toBeTruthy();
		}
	});

});