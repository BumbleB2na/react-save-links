import React, { useState } from 'react';
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
	addHyperlink: {
		color: theme.palette.text.hint
	},
}));

export default function LinkListItemAdd(props) {
	const classes = useStyles();

	// constructor
	const [stateIsDialogOpen, setStateIsDialogOpen] = useState(false);
	
	const handleClickToOpenDialog = () => {
		setStateIsDialogOpen(true);
	};
	const handleCloseDialog = () => {
		setStateIsDialogOpen(false);
	};

	return (
		<React.Fragment>
			<ListItem 
				className={classes.addHyperlink} button component="button"
				onClick={handleClickToOpenDialog}
			>
				<ListItemIcon>
					<AddIcon />
				</ListItemIcon>
				<ListItemText>
					New Hyperlink
				</ListItemText>
			</ListItem>
			<LinkListItemAddDialog
				open={stateIsDialogOpen}
				onCloseDialog={handleCloseDialog}
				onSaveNewHyperlink={props.onSaveNewHyperlink}
			/>
		</React.Fragment>
	);
}

function LinkListItemAddDialog(props) {
	const DEFAULT_TITLE = '';
	const DEFAULT_URL = 'https://';

	// constructor
	const [stateTitle, setStateTitle] = useState(props.title || DEFAULT_TITLE);
	const [stateUrl, setStateUrl] = useState(props.url || DEFAULT_URL);
	const [stateUrlError, setStateUrlError] = useState(null);
	
	const resetInputState = () => {
		setStateTitle(props.title || DEFAULT_TITLE);
		setStateUrl(props.url || DEFAULT_URL);
		setStateUrlError(null);
	};
	const handleClickSaveForLaterButton = () => {
		const isUrlEmpty = stateUrl.trim() === '';
		if(isUrlEmpty) {
			setStateUrlError('You must enter a hyperlink to be saved for later. E.g. "https://example.com"');
			return;
		}
		const isTheUrlValid = isUrlValid(stateUrl);
		if(!isTheUrlValid) {
			setStateUrlError('The hyperlink you entered is not valid. Valid example: "https://example.com"');
			return;
		}
		setStateUrlError(null);
		saveNewHyperlink();
		handleClose();
	};
	const isUrlValid = (url) => {
		var isValid = url.length > 9 && (url.substr(0, 7) === 'http://' || url.substr(0, 8) === 'https://');
		return isValid;
	};
	const saveNewHyperlink = () => {
		let newHyperlink = createHyperlinkFromState();
		props.onSaveNewHyperlink(newHyperlink);
	};
	const createHyperlinkFromState = () => {		
		let hyperlink = {
			title: (stateTitle) ? stateTitle.trim() : DEFAULT_TITLE,
			url: stateUrl.trim()
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
		props.onCloseDialog();

		setTimeout(() => {
			resetInputState();
		}, 1000);
	};

	return (
		<Dialog 
			aria-labelledby="form-dialog-title"
			open={props.open}
			onClose={handleClose}
		>
			<DialogTitle id="form-dialog-title">Save For Later</DialogTitle>
			<DialogContent>
				<DialogContentText>
					What do you want to read, watch, play or listen to?
				</DialogContentText>
				<TextField 
					margin="dense" type="text" fullWidth 
					id="title" 
					label="Title (optional)"
					value={stateTitle} 
					onChange={e => setStateTitle(e.target.value)}
				/>
				<TextField
					autoFocus margin="dense" type="text" required fullWidth
					error={stateUrlError}
					helperText={(stateUrlError) ? stateUrlError : " "}
					id="url" 
					label="Url"
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
	);
}