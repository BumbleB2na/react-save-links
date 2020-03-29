import React from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<h1>Save Links for Later</h1>
				<p>What do you want to read, watch or listen to?</p>
			</header>
			<div className="App-body">
				<a
					href="https://example.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Example.com
        		</a>
			</div>
			<footer className="App-footer">
				Copyright &copy; 2020
			</footer>
		</div>
	);
}

export default App;
