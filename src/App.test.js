import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

// mocks
import '@testing-library/jest-dom/extend-expect';
import DataLocalMock from './services/DataLocal/DataLocal';
jest.mock('./services/DataLocal/DataLocal');  // https://jestjs.io/docs/en/mock-functions#mocking-modules


it('renders current year in copyright', () => {
	const { getByText } = render(<App />);
	const year = (new Date()).getFullYear();
	const findYearRegex = new RegExp(year.toString());
	const footerElement = getByText(findYearRegex);
	expect(footerElement).toBeInTheDocument();
});
