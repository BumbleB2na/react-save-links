import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import LinkListItemAdd from '../../components/LinkListItemAdd/LinkListItemAdd';
import LinkListItem from '../../components/LinkListItem/LinkListItem';
import Data from "../../Data";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 0,
		paddingBottom: 0
	}
}));

export default function LinkList() {
	const classes = useStyles();

	// constructor
	const [stateHyperlinks, setStateHyperlinks] = useState([]);
	
	// componentDidMount / componentDidUpdate
	useEffect(() => {
		fetchHyperlinks();
	}, []);

	const fetchHyperlinks = async () => {
		const hyperlinks = await Data.getHyperlinks();
		setStateHyperlinks(hyperlinks);
	};
	const createHyperlink = async (hyperlink) => {
		alert('TODO: Create hyperlink by from data ('+JSON.stringify(hyperlink)+')');
	};
	const updateHyperlink = async (hyperlink) => {
		alert('TODO: Update hyperlink by from data ('+JSON.stringify(hyperlink)+')');
	};
	const deleteHyperlink = async (hyperlink) => {
		alert('TODO: delete hyperlink by id ('+hyperlink.id+')');
	};

	const linkListItemEls = stateHyperlinks.map(hyperlink => {
		return (
			<React.Fragment key={hyperlink.id}>
				<LinkListItem
					id={hyperlink.id}
					title={hyperlink.title}
					url={hyperlink.url}
					visited={hyperlink.visited}
					onUpdateHyperlinkAsVisited={(hyperlink) => updateHyperlink(hyperlink)}
					onDeleteHyperlink={(hyperlink) => deleteHyperlink(hyperlink)}
				></LinkListItem>
				<Divider />	
			</React.Fragment>
		);
	});

	return (
		<List className={classes.root}>
			<LinkListItemAdd
				onSaveNewHyperlink={(hyperlink) => createHyperlink(hyperlink)}
			/>
			<Divider />
			{linkListItemEls}
		</List>
	);
}