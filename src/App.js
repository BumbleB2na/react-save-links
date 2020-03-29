import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinkList from './components/LinkList/LinkList';

const useStyles = makeStyles((theme) => ({
	app: {
		minHeight: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	appHeader: {
		paddingLeft: 20,
		paddingRight: 20,
		fontSize: 'calc(8px + 1vmin)',
		backgroundColor: '#282c34', //theme.palette.primary.main,
		color: 'white' //theme.palette.text.main
	},
	appHeaderH1: {
		marginTop: 4,
		marginBottom: -8
	},
	appBody: {
		flex: 1,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: theme.palette.background.default, //theme.palette.background.paper
	},
	appFooter: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		fontSize: 'calc(8px + 1vmin)',
		backgroundColor: '#282c34', //theme.palette.primary.main,
		color: 'white' //theme.palette.text.main
	}
}));

function App() {
	const classes = useStyles();
	return (
		<Box className={classes.app}>
			<header className={classes.appHeader}>
				<h1 className={classes.appHeaderH1}>Save Links for Later</h1>
				<p>What do you want to read, watch or listen to?</p>
			</header>
			<Box className={classes.appBody}>
				<LinkList />
			</Box>
			<footer className={classes.appFooter}>
				Copyright &copy; 2020
			</footer>
		</Box>
	);
}

export default App;
