import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import LinkListItemSaveDialog from './LinkListItemSaveDialog';
import { linkListItemSaveDialogErrors } from './LinkListItemSaveDialogContants';


describe('LinkListItemSaveDialog()', () => {

	afterEach(cleanup);

	it('renders component', () => {
		const open = true;
		const handleCloseDialog = jest.fn();
		const handleUpdateHyperlink = jest.fn();
		
		render(
			<LinkListItemSaveDialog 
				id="123"
				title=""
				url="https://"
				open={open}
				onCloseDialog={handleCloseDialog}
				onUpdateHyperlink={handleUpdateHyperlink}
			/>
		);
	});

	it('shows empty hyperlink message on attempt to save empty url', async () => {
		const open = true;
		const handleCloseDialog = jest.fn();
		const handleUpdateHyperlink = jest.fn();

		// arrange
		const EMPTY_URL = " ";
		const { getByText, getByTestId } = render(
			<LinkListItemSaveDialog 
				id="123"
				title=""
				url={EMPTY_URL}
				open={open}
				onCloseDialog={handleCloseDialog}
				onUpdateHyperlink={handleUpdateHyperlink}
			/>
		);

		fireEvent.click(getByTestId("savebutton"));

		const findErrorRegex = new RegExp(linkListItemSaveDialogErrors.URL_EMPTY);
		expect(getByText(findErrorRegex)).toBeInTheDocument();
	});

	it('shows invalid hyperlink message on attempt to save invalid url', async () => {
		const open = true;
		const handleCloseDialog = jest.fn();
		const handleUpdateHyperlink = jest.fn();

		// arrange
		const INVALID_URL = 'htps://invalidurl.com';
		const { getByText, getByTestId } = render(
			<LinkListItemSaveDialog 
				id="123"
				title=""
				url={INVALID_URL}
				open={open}
				onCloseDialog={handleCloseDialog}
				onUpdateHyperlink={handleUpdateHyperlink}
			/>
		);

		fireEvent.click(getByTestId("savebutton"));

		const findErrorRegex = new RegExp(linkListItemSaveDialogErrors.URL_INVALID);
		expect(getByText(findErrorRegex)).toBeInTheDocument();
	});

});


/*
const VALID_URL = 'https://example.com';
const INVALID_URL = 'htp://invalid.com';
const ERROR = {
	URL_EMPTY: 'You must enter a hyperlink to be saved for later. E.g. "https://example.com"',
	URL_INVALID: 'The hyperlink you entered is not valid. Valid example: "https://example.com"',
};

describe('when validating url', () => {
	xit('resolves if valid', () => {
		const isUrlValid = LinkListItemSaveDialog.isUrlValid(VALID_URL);
		expect(isUrlValid).toBe(true);
	});

	xit('fails if invalid', () => {
		const isUrlValid = LinkListItemSaveDialog.isUrlValid(INVALID_URL);
		expect(isUrlValid).toBe(false);
	});
});

describe('on attempt save when url is empty', () => {
	xit('shows error message', () => {
		LinkListItemSaveDialog.setStateUrl(INVALID_URL);
		try {
			LinkListItemSaveDialog.handleClickSaveForLaterButton();
		}
		catch(error) {
			expect(LinkListItemSaveDialog.errorMessage).toBe(ERROR.URL_EMPTY);
		}
	});
});

describe('on attempt save when url is invalid', () => {
	xit('shows error message', () => {
		LinkListItemSaveDialog.setStateUrl(INVALID_URL);
		try {
			LinkListItemSaveDialog.handleClickSaveForLaterButton();
		}
		catch(error) {
			expect(LinkListItemSaveDialog.errorMessage).toBe(ERROR.URL_INVALID);
		}
	});
});
*/