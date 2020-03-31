import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import LinkList from './components/LinkList/LinkList';

const useStyles = makeStyles((theme) => ({
	app: {
		minHeight: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	appHeader: {
		paddingLeft: 16,
		paddingRight: 16,
		fontSize: 'calc(8px + 1vmin)',
		backgroundColor: '#282c34',
		color: 'white'
	},
	appHeaderH1: {
		marginTop: 2,
		marginBottom: -10
	},
	appBody: {
		flex: 1,
		backgroundColor: theme.palette.background.default,
	},
	appFooter: {
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 16,
		paddingRight: 16,
		fontSize: 'calc(8px + 1vmin)',
		backgroundColor: '#282c34',
		color: 'white'
	}
}));

function App() {
	const classes = useStyles();
	const year = (new Date()).getFullYear();
	return (
		<Box className={classes.app}>
			<header className={classes.appHeader}>
				<h1 className={classes.appHeaderH1}>Save Links for Later</h1>
				<p>What do you want to read, watch, play or listen to?</p>
			</header>
			<Box className={classes.appBody}>
				<LinkList />
			</Box>
			<footer className={classes.appFooter}>
				Copyright &copy; {year}
			</footer>
		</Box>
	);
}

export default App;
