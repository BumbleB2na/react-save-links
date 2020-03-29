import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
// Dialog
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
	newHyperlink: {
		color: theme.palette.text.hint
	},
	hyperlinkVisited: {
		color: 'purple',
		textDecorationLine: 'line-through'
	},
}));

function ListItemAddButtonDialog(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClickAdd = () => {
		alert('TODO: Validate input and add new hyperlink');
		handleClose();
	};
	const handleKeyUpUrl = (e) => {
		const isEnterKey = (e.key === 'Enter');
		if(isEnterKey)
			handleClickAdd();
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<ListItem className={classes.newHyperlink} button component="button" {...props}
				onClick={handleClickOpen}
			>			
				<ListItemIcon>
					<AddIcon />
				</ListItemIcon>
				<ListItemText>
					New Hyperlink
				</ListItemText>
			</ListItem>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">New Hyperlink</DialogTitle>
				<DialogContent>
					<DialogContentText>
						What do you want to read, watch or listen to?
					</DialogContentText>
					<TextField
						margin="dense"
						id="title"
						label="Title (optional)"
						type="text"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						id="url"
						label="Url"
						type="text"
						required
						fullWidth
						onKeyUp={handleKeyUpUrl}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClickAdd} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default class LinkListItemAdd extends React.Component {
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
			<ListItemAddButtonDialog />
		);
	}
}