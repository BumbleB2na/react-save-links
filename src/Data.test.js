import React from 'react';
import { render } from '@testing-library/react';
import Data from './Data';

beforeEach(() => {
	Data.initMockHyperlinks();
});

test('gets hyperlinks', async () => {
	const hyperlinks = await Data.getHyperlinks();
	expect(hyperlinks.length).toBe(2);
});

test('creates hyperlink', async () => {
	const newHyperlink = {
		title: 'Test',
		url: 'https://test.com'
	};
	const hyperlinks = await Data.createHyperlink(newHyperlink);
	expect(hyperlinks.length).toBe(3);
	const createdHyperlink = hyperlinks[0];
	expect(typeof createdHyperlink.id).toBe('string');
	expect(createdHyperlink.title).toBe('Test');
	expect(createdHyperlink.url).toBe('https://test.com');
	expect(new Date(createdHyperlink.createdOn).getDate()).toBe(new Date().getDate());
});

test('updates hyperlink', async () => {
	const oldHyperlinks = await Data.getHyperlinks();
	const oldHyperlink = Object.assign({}, oldHyperlinks[0]);
	const updatesToHyperlink = {
		id: oldHyperlink.id,
		visited: true
	};
	const hyperlinks = await Data.updateHyperlink(updatesToHyperlink);
	const updatedHyperlink = hyperlinks[0];
	expect(updatedHyperlink.visited).toBe(true);
	expect(updatedHyperlink.title).toBe(oldHyperlink.title);
	expect(updatedHyperlink.url).toBe(oldHyperlink.url);
});

test('deletes hyperlink', async () => {
	const oldHyperlinks = await Data.getHyperlinks();
	const idToDelete = oldHyperlinks[0].id;
	const deleteHyperlink = {
		id: idToDelete
	};
	const hyperlinks = await Data.deleteHyperlink(deleteHyperlink);
	expect(hyperlinks.length).toBe(1);
});
