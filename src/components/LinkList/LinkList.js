import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import LinkListItemAdd from '../../components/LinkListItemAdd/LinkListItemAdd';
import LinkListItem from '../../components/LinkListItem/LinkListItem';
import Data from "../../services/Data/Data";
import { linkListErrors } from './LinkListContants';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 0,
		paddingBottom: 0
	},
	progressBar: {
		position: 'absolute',
		width: '100%'
	},
	progressBarHidden: {
		position: 'absolute',
		width: '100%',
		opacity: 0
	}
}));

export default function LinkList() {
	const classes = useStyles();

	// constructor
	const [stateHyperlinks, setStateHyperlinks] = React.useState([]);

	const [isSyncing, setIsSyncing] = React.useState(false);

	const [openSnackbarForError, setOpenSnackbarForError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  	return;
		}  
		setOpenSnackbarForError(false);
	};
  
	const showErrorMessage = (message) => {
		setOpenSnackbarForError(false);
		setOpenSnackbarForError(true);
		setErrorMessage(message);
	}

	const fetchHyperlinks = async () => {
		try {
			setIsSyncing(true);
			const hyperlinks = await Data.fetchHyperlinks();
			setStateHyperlinks(hyperlinks);
		}
		catch(error) {
			showErrorMessage(linkListErrors.READ);
			console.error(error);
		}
		await syncHyperlinks();
	};

	// componentDidMount / componentDidUpdate
	React.useEffect(() => {
		fetchHyperlinks();
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
	// Line above to disable eslint is a CI workaround (https://stackoverflow.com/a/60327893/285714)
	
	const syncHyperlinks = async () => {
		try {
			setIsSyncing(true);
			const hyperlinks = await Data.syncHyperlinks();
			setStateHyperlinks(hyperlinks);
		}
		catch(error) {
			showErrorMessage(linkListErrors.SYNC);
			console.error(error);
		}
		finally {
			setIsSyncing(false);
		}
	}
	const createHyperlink = async (hyperlink) => {
		try {
			const hyperlinks = await Data.createHyperlink(hyperlink);
			setStateHyperlinks(hyperlinks);
		}
		catch(error) {
			showErrorMessage(linkListErrors.CREATE);
			console.error(error);
		}
		await syncHyperlinks();
	};
	const updateHyperlink = async (hyperlink) => {
		try {
			const hyperlinks = await Data.updateHyperlink(hyperlink);
			setStateHyperlinks(hyperlinks);
		}
		catch(error) {
			showErrorMessage(linkListErrors.UPDATE);
			console.error(error);
		}
		await syncHyperlinks();
	};
	const deleteHyperlink = async (hyperlink) => {
		try {
			const hyperlinks = await Data.deleteHyperlink(hyperlink);
			setStateHyperlinks(hyperlinks);
		}
		catch(error) {
			showErrorMessage(linkListErrors.DELETE);
			console.error(error);
		}
		await syncHyperlinks();
	};

	return (
		<React.Fragment>
			<LinkListSyncProgress
				isSyncing={isSyncing}
			/>
			<List className={classes.root}>
				<LinkListItemAdd
					onSaveNewHyperlink={(hyperlink) => createHyperlink(hyperlink)}
				/>
				<Divider />
				<LinkListItems
					hyperlinks={stateHyperlinks}
					onUpdateHyperlink={(hyperlink) => updateHyperlink(hyperlink)}
					onDeleteHyperlink={(hyperlink) => deleteHyperlink(hyperlink)}
				/>
			</List>
			<LinkListError
				openSnackbarForError={openSnackbarForError}
				handleClose={handleClose}
				errorMessage={errorMessage}
			/>
		</React.Fragment>
	);
}

function LinkListItems(props) {

	const linkListItemEls = props.hyperlinks.map(hyperlink => {
		return (
			<React.Fragment key={hyperlink.id}>
				<LinkListItem
					id={hyperlink.id}
					title={hyperlink.title}
					url={hyperlink.url}
					visited={hyperlink.visited}
					onUpdateHyperlink={props.onUpdateHyperlink}
					onDeleteHyperlink={props.onDeleteHyperlink}
				/>
				<Divider />
			</React.Fragment>
		);
	});

	return (
		<React.Fragment>
			{linkListItemEls}
		</React.Fragment>
	);
}

function LinkListError(props) {
	return (
		<Snackbar open={props.openSnackbarForError} autoHideDuration={6000} onClose={props.handleClose}>
			<Alert onClose={props.handleClose} severity="error">
				{props.errorMessage}
			</Alert>
		</Snackbar>
	);
}

function LinkListSyncProgress(props) {
	const classes = useStyles();

	if(props.isSyncing) {
		return (
			<LinearProgress className={classes.progressBar} />
		);
	} else {
		return (
			<LinearProgress className={classes.progressBarHidden} />
		);
	}
}