import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Data from './Data';

test('renders copyright in footer', () => {
	const { getByText } = render(<App />);
	const footerElement = getByText(/Copyright/i);
	expect(footerElement).toBeInTheDocument();
});
