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

function ListItemButton(props) {
	const classes = useStyles();

	const handleClickHyperlink = () => {
		alert('TODO: Open dialog to edit existing hyperlink');
		return false;
	};

	return (
		<ListItem className={props.visited ? classes.hyperlinkVisited : classes.hyperlink} button component="button" {...props}
			onClick={handleClickHyperlink}
		>
			{props.children}
		</ListItem>
	);
}
function ListItemTextLink(props) {
	const classes = useStyles();

	const handleClickHyperlink = (e) => {
		alert('TODO: Update hyperlink to set it to visited. Now opening hyperlink in new tab...');
		e.stopPropagation();
	};

	return (
		<ListItemText>
			<Link 
				className={props.visited ? classes.hyperlinkVisited : classes.hyperlink} 
				button component="a"
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

const handleClickDelete = () => {
	alert('TODO: delete hyperlink');
};

export default class LinkListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title || '',
			url: this.props.url || 'https://',
			visited: this.props.visited || false
		}
	}
	render() {
		return (
			<ListItemButton>
				<ListItemIcon>
					<LinkIcon />
				</ListItemIcon>
				<ListItemTextLink
					title={this.state.title}
					url={this.state.url}
					visited={this.state.visited}
				/>
				<ListItemSecondaryAction>
					<IconButton
						onClick={handleClickDelete}
					>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItemButton>
		);
	}
}