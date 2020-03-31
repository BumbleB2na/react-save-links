import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Data from './Data';

test('renders current year in copyright', () => {
	const { getByText } = render(<App />);
	const year = (new Date()).getFullYear();
	const findYearRegex = new RegExp(year.toString());
	const footerElement = getByText(findYearRegex);
	expect(footerElement).toBeInTheDocument();
});
