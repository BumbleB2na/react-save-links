// Mock data from database
export const mockHyperlinks = {
	"3dbd8r9v65gy0iyzrgdyr" : {
		id: "3dbd8r9v65gy0iyzrgdyr",
		title: "Example.com",
		url: "https://example.com",
		visited: false,
		createdOn: "2020-03-31T01:11:11.948Z",
		updatedOn: "2020-03-31T01:11:11.948Z"
	},
	"7rm3t370equwsquzsz0nn": {
		id: "7rm3t370equwsquzsz0nn",
		title: "",
		url: "https://google.com",
		visited: true,
		createdOn: "2020-03-31T02:22:22.948Z",
		updatedOn: "2020-03-31T02:22:22.948Z"
	}
};
// Mock data as it is stored in the app, sorted desc by createdOn
export const mockHyperlinksArray = [
	{
		id: "7rm3t370equwsquzsz0nn",
		title: "",
		url: "https://google.com",
		visited: true,
		createdOn: "2020-03-31T02:22:22.948Z",
		updatedOn: "2020-03-31T02:22:22.948Z"
	},
	{
		id: "3dbd8r9v65gy0iyzrgdyr",
		title: "Example.com",
		url: "https://example.com",
		visited: false,
		createdOn: "2020-03-31T01:11:11.948Z",
		updatedOn: "2020-03-31T01:11:11.948Z"
	}
];
