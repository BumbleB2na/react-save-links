import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';

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
	return (
		<ListItem className={props.visited ? classes.hyperlinkVisited : classes.hyperlink} button component="button" {...props}>
			{props.children}
		</ListItem>
	);
}
function ListItemTextLink(props) {
	const classes = useStyles();
	return (
		<ListItemText>
			<Link 
				className={props.visited ? classes.hyperlinkVisited : classes.hyperlink} 
				button component="a"
				href={props.url}
				target="_blank"
				rel="noopener noreferrer"
				onClick={() => alert('hyperlink clicked')}
			>
				{props.title || props.url}
			</Link>
		</ListItemText>
	);
}

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
						onClick={() => { alert('edit icon clicked') }}
					>
						<EditIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItemButton>
		);
	}
}