import React from 'react';
import { render, cleanup } from '@testing-library/react';

import LinkList from './LinkList';
import { linkListErrors } from './LinkListContants';

// mocks
import LinkListItemAddMock from '../../components/LinkListItemAdd/LinkListItemAdd';
import LinkListItemMock from '../../components/LinkListItem/LinkListItem';
import DataMock from '../../services/Data/Data';

describe('LinkList()', () => {
	beforeEach(() => {
		jest.mock('../../components/LinkListItemAdd/LinkListItemAdd');
		jest.mock('../../components/LinkListItem/LinkListItem'); 
		jest.mock('../../services/Data/Data');
		// do nothing by default when these functions are called:
		jest.spyOn(DataMock, 'fetchHyperlinks');
		jest.spyOn(DataMock, 'syncHyperlinks');
	});

	afterEach(cleanup);

	it('renders without crashing', () => {
		render(<LinkList />);
	});

	it('show error message if unable to fetch hyperlinks', async () => {
		jest.spyOn(DataMock, 'fetchHyperlinks').mockRejectedValue(new Error());

		const { getByText, findByText } = render(<LinkList />);

		const errorReadRegex = new RegExp(linkListErrors.READ);
		await findByText(errorReadRegex);
		expect(getByText(errorReadRegex)).toBeInTheDocument();
	});

	it('show error message if unable to sync hyperlinks', async () => {
		jest.spyOn(DataMock, 'syncHyperlinks').mockRejectedValue(new Error());

		const { getByText, findByText } = render(<LinkList />);

		const errorSyncRegex = new RegExp(linkListErrors.SYNC);
		await findByText(errorSyncRegex);
		expect(getByText(errorSyncRegex)).toBeInTheDocument();
	});

});
