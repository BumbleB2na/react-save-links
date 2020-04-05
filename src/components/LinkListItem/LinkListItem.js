import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import DeleteIcon from '@material-ui/icons/Delete';

import LinkListItemSaveDialog from '../../components/LinkListItemSaveDialog/LinkListItemSaveDialog';

const useStyles = makeStyles((theme) => ({
	hyperlink: {
		color: 'blue'
	},
	hyperlinkVisited: {
		color: 'purple',
		textDecorationLine: 'line-through'
	},
}));

export default function LinkListItem(props) {
	const handleHyperlinkClicked = () => {
		const updatedHyperlink = {
			id: props.id,
			visited: true
		};
		props.onUpdateHyperlink(updatedHyperlink);
	}
	const handleDeleteClicked = () => {
		const deletedHyperlink = {
			id: props.id
		};
		props.onDeleteHyperlink(deletedHyperlink);
	};

	return (
		<ListItemEditable
			id={props.id}
			title={props.title}
			url={props.url}
			onUpdateHyperlink={props.onUpdateHyperlink}
		>
			<ListItemIcon>
				<LinkIcon />
			</ListItemIcon>
			<ListItemTextLink
				id={props.id}
				title={props.title}
				url={props.url}
				visited={props.visited}
				onUpdateHyperlinkAsVisited={handleHyperlinkClicked}
			/>
			<ListItemSecondaryAction>
				<IconButton
					onClick={handleDeleteClicked}
				>
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItemEditable>
	);
}

function ListItemEditable(props) {
	const classes = useStyles();
	
	// constructor
	const [stateIsDialogOpen, setStateIsDialogOpen] = React.useState(false);
	
	const handleClickToOpenDialog = () => {
		setStateIsDialogOpen(true);
	};
	const handleCloseDialog = () => {
		setStateIsDialogOpen(false);
	};

	return (
		<React.Fragment>
			<ListItem 
				className={props.visited ? classes.hyperlinkVisited : classes.hyperlink} 
				button component="button"
				onClick={handleClickToOpenDialog}
			>
				{props.children}
			</ListItem>
			<LinkListItemSaveDialog
				id={props.id}
				title={props.title}
				url={props.url}
				open={stateIsDialogOpen}
				onCloseDialog={handleCloseDialog}
				onUpdateHyperlink={props.onUpdateHyperlink}
			/>
		</React.Fragment>
	);
}

function ListItemTextLink(props) {
	const classes = useStyles();

	const handleClickHyperlink = (e) => {
		updateHyperlinkAsVisited();
		e.stopPropagation();
	};
	const updateHyperlinkAsVisited = () => {
		const updatedHyperlink = { 
			id: props.id,
			visited: true	
		};
		props.onUpdateHyperlinkAsVisited(updatedHyperlink);
	}

	return (
		<ListItemText>
			<Link 
				className={props.visited ? classes.hyperlinkVisited : classes.hyperlink} 
				button="true" 
				component="a"
				href={props.url}
				target="_blank"
				rel="noopener noreferrer"
				onClick={handleClickHyperlink}
			>
				{props.title || props.url}
			</Link>
		</ListItemText>
	);
}
