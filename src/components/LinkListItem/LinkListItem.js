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
		props.onUpdateHyperlinkAsVisited(updatedHyperlink);
	}
	const handleDeleteClicked = () => {
		const deletedHyperlink = {
			id: props.id
		};
		props.onDeleteHyperlink(deletedHyperlink);
	};

	return (
		<ListItemButton>
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
		</ListItemButton>
	);
}

function ListItemButton(props) {
	const classes = useStyles();

	const handleClickHyperlink = () => {
		alert('TODO: Open dialog to edit existing hyperlink');
		return false;
	};

	return (
		<ListItem 
			className={props.visited ? classes.hyperlinkVisited : classes.hyperlink} 
			button component="button"
			onClick={handleClickHyperlink}
		>
			{props.children}
		</ListItem>
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
