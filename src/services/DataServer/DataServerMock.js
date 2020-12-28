class DataServerMock {

	// TODO: Consider using MSW instead for sharing mocked endpoints between tests and app code: https://kentcdodds.com/blog/stop-mocking-fetch
	mockGet(timeout = 0) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const hyperlinks = this.getMockServerHyperlinks();
				resolve({
					json: () => Promise.resolve(hyperlinks),
				});
			}, timeout);
		});
	}

	mockAddOrUpdate(hyperlink, timeout = 0) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const hyperlinks = this.getMockServerHyperlinks().map(h => {
					if(h.id === hyperlink.id) {
						return this.alterSyncedHyperlink(hyperlink);
					} else {
						return h;
					}
				});
				resolve({
					json: () => Promise.resolve(hyperlinks),
				});
			}, timeout);
		});
	}

	// For testing -- alters hyperlink the same as a server would
	alterSyncedHyperlink(hyperlink) {
		let syncedHyperlink = Object.assign({}, hyperlink);  // make copy
		syncedHyperlink.updatedOn = this.getISOTimestamp();
		delete syncedHyperlink.dirty;
		return syncedHyperlink;
	}

	getISOTimestamp() {
		return (new Date()).toISOString();
	}

	getMockServerHyperlinks() {
		// Mock data from server
		const mockServerHyperlinks = [
			// Test #1: Hyperlink matches in both local and server databases
			{
				id: "fq2ic2mh7akvcmhwhp3y8g",
				title: "Test 1",
				url: "https://example.com",
				visited: false,
				createdOn: "2020-03-31T01:11:11.111Z",
				updatedOn: "2020-03-31T01:11:11.111Z"
			},
			// Test #2: Hyperlink in local database is less recent than hyperlink in server database. Needs to update locally.
			{
				id: "184uo07vek9j56gxbw5m0e",
				title: "Test 2",
				url: "https://example.com",
				visited: true,
				createdOn: "2020-03-31T02:22:22.222Z",
				updatedOn: "2020-03-32T02:23:23.223Z"
			},
			// Test #3: Hyperlink in local database is more recent than hyperlink in server database. Is flagged as "dirty" and needs to sync to server.
			{
				id: "c5yl1u4cfi64tvbgu66wbl",
				title: "Test 3 outdated on server",
				url: "https://example.com",
				visited: false,
				createdOn: "2020-03-31T03:33:33.333Z",
				updatedOn: "2020-03-31T03:33:33.333Z"
			}
		];
		return JSON.parse(JSON.stringify(mockServerHyperlinks));  // make a deep copy
	}
}

export default new DataServerMock();
