import React from 'react';
import { render, cleanup } from '@testing-library/react';

import LinkListItemAdd from './LinkListItemAdd';


describe('LinkListItemAdd()', () => {

	afterEach(cleanup);

	it('renders component', () => {
		const { getByText } = render(
			<LinkListItemAdd 
				onSaveNewHyperlink={() => {}}
			/>
		);
		expect(getByText(/New Hyperlink/i)).toBeInTheDocument();
	});

});
