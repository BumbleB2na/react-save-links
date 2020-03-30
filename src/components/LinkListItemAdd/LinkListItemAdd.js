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
	const [stateIsDialogOpen, setStateIsDialogOpen] = React.useState(false);
	const [stateUrl, setStateUrl] = React.useState(props.url);
	const [stateTitle, setStateTitle] = React.useState(props.title);
	
	const resetInputState = () => {
		setStateTitle('');
		setStateUrl('https://');
	};	
	const handleClickToOpenDialog = () => {
		setStateIsDialogOpen(true);
	};
	const handleClickSaveForLaterButton = () => {
		const isUrlEmpty = stateUrl.trim() === '';
		if(isUrlEmpty) {
			showAlertMessage('Whoops','You must enter a hyperlink to be saved for later');
			return;
		}
		const isTheUrlValid = isUrlValid(stateUrl);
		if(!isTheUrlValid) {
			showAlertMessage('Whoops','The hyperlink you entered is not valid');
			return;
		}
		saveHyperlink();
		handleClose();
	};
	const showAlertMessage = (title, msg) => {
		alert(title + ': ' + msg);
	};
	const isUrlValid = (url) => {
		var isValid = url.length > 9 && (url.substr(0, 7) === 'http://' || url.substr(0, 8) === 'https://');
		return isValid;
	};
	const saveHyperlink = async () => {
		let newHyperlink = createHyperlinkFromState();

		alert('TODO: Create new hyperlink from state: '+ JSON.stringify(newHyperlink));
	};
	const createHyperlinkFromState = () => {		
		let hyperlink = {
			url: stateUrl.trim(),
			visited: false,
			createdOn: (new Date()).toISOString()
		}
		if(stateTitle)
			hyperlink.title = stateTitle;
		return hyperlink;
	};
	const handleKeyUpUrl = (e) => {
		const isEnterKey = (e.key === 'Enter');
		if(isEnterKey)
			handleClickSaveForLaterButton();
	};
	const handleClose = () => {
		setStateIsDialogOpen(false);
		setTimeout(() => {
			resetInputState();
		}, 1000);
	};

	return (
		<div>
			<ListItem className={classes.newHyperlink} button component="button" {...props}
				onClick={handleClickToOpenDialog}
			>
				<ListItemIcon>
					<AddIcon />
				</ListItemIcon>
				<ListItemText>
					New Hyperlink
				</ListItemText>
			</ListItem>
			<Dialog open={stateIsDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Save For Later</DialogTitle>
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
						value={stateTitle}
						onChange={e => setStateTitle(e.target.value)}
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
						value={stateUrl}
						onChange={e => setStateUrl(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button 
						color="primary"
						onClick={handleClose} 
					>
						Cancel
					</Button>
					<Button 
						color="primary"
						onClick={handleClickSaveForLaterButton} 
					>
						Save Link
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
			isDialogOpen: false
		}
	}
	render() {
		return (
			<ListItemAddButtonDialog
				title={this.state.title}	
				url={this.state.url}
			/>
		);
	}
}