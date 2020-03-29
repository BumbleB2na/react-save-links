import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 0,
		paddingBottom: 0
	}
}));

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

export default function LinkList() {
	const classes = useStyles();
	return (
		<List className={classes.root}>
			<ListItemLink
				href="https://example.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				<ListItemText primary="Example.com"></ListItemText>
			</ListItemLink>
			<ListItemLink
				href="https://example.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				<ListItemText primary="Example.com"></ListItemText>
			</ListItemLink>
		</List>
	);
}