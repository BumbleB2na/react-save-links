import React from 'react';
import { render, cleanup } from '@testing-library/react';

import LinkListItem from './LinkListItem';


describe('LinkListItem()', () => {
	
	afterEach(cleanup);

	it('renders component', () => {
		const hyperlink = {
			id: "3dbd8r9v65gy0iyzrgdyr",
			title: "Example.com",
			url: "https://example.com",
			visited: false,
			createdOn: "2020-03-31T01:11:11.948Z",
			updatedOn: "2020-03-31T01:11:11.948Z"
		};
		const handleUpdateHyperlink = jest.fn();
		const handleDeleteHyperlink = jest.fn();
		const { getByText } = render(
			<LinkListItem 
				id={hyperlink.id}
				title={hyperlink.title}
				url={hyperlink.url}
				visited={hyperlink.visited}
				onUpdateHyperlink={handleUpdateHyperlink}
				onDeleteHyperlink={handleDeleteHyperlink}
			/>
		);
		const findTitleRegex = new RegExp(hyperlink.title);
		expect(getByText(findTitleRegex)).toBeInTheDocument();
	});

});
