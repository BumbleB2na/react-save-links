import React from 'react';
import { render, cleanup, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';

import LinkList from './LinkList';
import Data from '../../services/Data/Data';
import { linkListErrors } from './LinkListContants';

// mocks
import { mockLocalHyperlinks } from '../../services/DataLocal/DataLocalMock';

describe('LinkList()', () => {
	beforeEach(() => {
		jest.mock('../../components/LinkListItemAdd/LinkListItemAdd');
		jest.mock('../../components/LinkListItem/LinkListItem');
		// Instead of mocking out Data that gets called from LinkList, 
		// we'll arrange tests to spy on Data methods return mock data
		//jest.mock('../../services/Data/Data');
	});

	afterEach(cleanup);

	it('renders', async () => {
		// Arrange
		jest.spyOn(Data, 'fetchHyperlinks').mockImplementation(() => Promise.resolve([]));
		jest.spyOn(Data, 'syncHyperlinks').mockImplementation(() => Promise.resolve([]));

		// Act
		const { queryByTestId } = render(<LinkList />);
		await waitForElementToBeRemoved(() => queryByTestId('link-list-progress-bar-is-active'));
	});

	it('renders hyperlinks', async () => {
		// Arrange - Return mock data
		jest.spyOn(Data, 'fetchHyperlinks').mockImplementation(() => Promise.resolve(mockLocalHyperlinks));
		jest.spyOn(Data, 'syncHyperlinks').mockImplementation(() => Promise.resolve(mockLocalHyperlinks));

		// Act
		const { getByText, queryByTestId } = render(<LinkList />);
		await waitForElementToBeRemoved(() => queryByTestId('link-list-progress-bar-is-active'));
			
		// Assert - Hyperlinks rendered from mock data
		expect(mockLocalHyperlinks.length > 1).toBeTruthy();
		for(var i = 0; i < mockLocalHyperlinks.length; i++) {
			const mockHyperlink = mockLocalHyperlinks[i];
			const hyperlinkDisplayText = (mockHyperlink.title !== '') ? mockHyperlink.title : mockHyperlink.url;
			const hyperlinkRegex = new RegExp(hyperlinkDisplayText);
			await waitForElement(() => getByText(hyperlinkRegex));
			expect(getByText(hyperlinkRegex)).toBeInTheDocument();
		}
	});

	it('show error message if unable to fetch hyperlinks', async () => {
		// Arrange - Throw an error from Data.fetchHyperlinks()
		jest.spyOn(Data, 'fetchHyperlinks').mockImplementation(() => { throw new Error(linkListErrors.READ); });
		jest.spyOn(Data, 'syncHyperlinks').mockImplementation(() => Promise.resolve([]));
		console.error = jest.fn();  // suppress console.error messages

		// Act
		const { getByText } = render(<LinkList />);

		// Assert - Error message is displayed
		const errorReadRegex = new RegExp(linkListErrors.READ);
		await waitForElement(() => getByText(errorReadRegex));
		expect(getByText(errorReadRegex)).toBeInTheDocument();
	});

	it('show error message if unable to sync hyperlinks', async () => {
		// Arrange - Throw an error from Data.syncHyperlinks()
		jest.spyOn(Data, 'fetchHyperlinks').mockImplementation(() => Promise.resolve([]));
		jest.spyOn(Data, 'syncHyperlinks').mockImplementation(() => { throw new Error(linkListErrors.SYNC); });
		console.error = jest.fn();  // suppress console.error messages

		const { getByText } = render(<LinkList />);
			
		// Assert - Error message is displayed
		const errorSyncRegex = new RegExp(linkListErrors.SYNC);
		await waitForElement(() => getByText(errorSyncRegex));
		expect(getByText(errorSyncRegex)).toBeInTheDocument();
	});

});
