import Data from './Data';

describe('without mock data', () => {
	it('can get hyperlinks', async () => {
		const hyperlinks = await Data.getHyperlinks();
		expect(hyperlinks.length).toBe(0);
	});
});

describe('with mock data', () => {
	beforeEach(async () => {
		await Data.initMockHyperlinks();
	});
	
	afterEach(async () => {
		await Data.resetMockHyperlinks();
	});

	it('can get hyperlinks', async () => {
		const hyperlinks = await Data.getHyperlinks();
		expect(hyperlinks.length).not.toBe(0);  // because it should have loaded in at least 1 item from mock data
	});

	it('can create a hyperlink', async () => {
		const newHyperlink = {
			title: 'Test',
			url: 'https://test.com'
		};
		const hyperlinks = await Data.createHyperlink(newHyperlink);
		const createdHyperlink = hyperlinks[0];  // it should be created as first list item
		expect(typeof createdHyperlink.id).toBe('string');
		expect(createdHyperlink.title).toBe('Test');
		expect(createdHyperlink.url).toBe('https://test.com');
		expect(new Date(createdHyperlink.createdOn).getDate()).toBe(new Date().getDate());
	});

	it('does not create hyperlink if id passed in', async () => {
		const newHyperlink = {
			id: '3dbd8r9v65gy0iyzrgdyr',
			title: 'Test',
			url: 'https://test.com'
		};
		try {
			await Data.createHyperlink(newHyperlink);
		}
		catch(error) {
			expect(error.message).toBe(Data.ERROR.CREATE);
		}
	});

	it('can update a hyperlink', async () => {
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

	it('does not update hyperlink if id not passed in', async () => {
		const updatesToHyperlink = {
			visited: true
		};
		try {
			await Data.updateHyperlink(updatesToHyperlink);
		}
		catch(error) {
			expect(error.message).toBe(Data.ERROR.UPDATE);
		}
	});

	it('can delete a hyperlink', async () => {
		const oldHyperlinks = await Data.getHyperlinks();
		const idToDelete = oldHyperlinks[0].id;
		const deleteHyperlink = {
			id: idToDelete
		};
		const hyperlinks = await Data.deleteHyperlink(deleteHyperlink);
		expect(hyperlinks.length).toBe(oldHyperlinks.length-1);
	});

	it('does not delete hyperlink if id not passed in', async () => {
		const deleteHyperlink = {};
		try {
			await Data.deleteHyperlink(deleteHyperlink);
		}
		catch(error) {
			expect(error.message).toBe(Data.ERROR.DELETE);
		}
	});

});
