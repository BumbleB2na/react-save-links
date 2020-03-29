import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import LinkListItemAdd from '../../components/LinkListItemAdd/LinkListItemAdd';
import LinkListItem from '../../components/LinkListItem/LinkListItem';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 0,
		paddingBottom: 0
	}
}));

export default function LinkList() {
	const classes = useStyles();
	return (
		<List className={classes.root}>
			<LinkListItemAdd />
			<Divider />
			<LinkListItem
				title="Example.com"
				url="https://example.com"
			></LinkListItem>
			<Divider />
			<LinkListItem
				url="https://google.com"
				visited="true"
			></LinkListItem>
			<Divider />
		</List>
	);
}