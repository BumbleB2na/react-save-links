import React from 'react';

export default class LinkList extends React.Component {
	render() {
		return (
			<ul>
				<li>
					<a
						href="https://example.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Example.com
					</a>
				</li>
				<li>
					<a
						href="https://example.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Example.com
					</a>
				</li>
			</ul>
		);
	}
}