import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { linkListItemSaveDialogErrors } from './LinkListItemSaveDialogContants';

export default function LinkListItemSaveDialog(props) {
	const DEFAULT_TITLE = '';
	const DEFAULT_URL = 'https://';

	// constructor
	const [stateTitle, setStateTitle] = React.useState(props.title || DEFAULT_TITLE);
	const [stateUrl, setStateUrl] = React.useState(props.url || DEFAULT_URL);	
	const [stateUrlError, setStateUrlError] = React.useState(null);
	
	const resetInputState = () => {
		setStateTitle(props.title || DEFAULT_TITLE);
		setStateUrl(props.url || DEFAULT_URL);
		setStateUrlError(null);
	};

	const handleClickSaveForLaterButton = () => {
		const isUrlEmpty = stateUrl.trim() === '';
		if(isUrlEmpty) {
			setStateUrlError(linkListItemSaveDialogErrors.URL_EMPTY);
			return;
		}
		const isTheUrlValid = isUrlValid(stateUrl);
		if(!isTheUrlValid) {
			setStateUrlError(linkListItemSaveDialogErrors.URL_INVALID);
			return;
		}
		setStateUrlError(null);
		if(props.id)
			updateHyperlink();
		else
			saveNewHyperlink();
		handleClose();
	};
	const isUrlValid = (url) => {
		var isValid = url.length > 9 && (url.substr(0, 7) === 'http://' || url.substr(0, 8) === 'https://');
		return isValid;
	};
	const updateHyperlink = () => {
		let updatesToHyperlink = {
			id: props.id,
			...createHyperlinkFromState()
		};
		props.onUpdateHyperlink(updatesToHyperlink);
	};
	const saveNewHyperlink = () => {
		let newHyperlink = createHyperlinkFromState();
		props.onSaveNewHyperlink(newHyperlink);
	};
	const createHyperlinkFromState = () => {		
		let hyperlink = {
			url: stateUrl.trim()
		}
		if(stateTitle)
			hyperlink.title = stateTitle.trim();
		return hyperlink;
	};
	const handleKeyUpUrl = (e) => {
		const isEnterKey = (e.key === 'Enter');
		if(isEnterKey)
			handleClickSaveForLaterButton();
	};
	const handleOpen = () => {
		resetInputState();
	};
	const handleClose = () => {
		props.onCloseDialog();
	};

	return (
		<Dialog 
			aria-labelledby="form-dialog-title"
			open={props.open}
			onEnter={handleOpen}
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
					error={(stateUrlError !== null)}
					helperText={(stateUrlError !== null) ? stateUrlError : " "}
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
					data-testid="savebutton"
				>
					Save Link
				</Button>
			</DialogActions>
		</Dialog>
	);
}