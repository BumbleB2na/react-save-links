import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders copyright in footer', () => {
	const { getByText } = render(<App />);
	const footerElement = getByText(/Copyright/i);
	expect(footerElement).toBeInTheDocument();
});
