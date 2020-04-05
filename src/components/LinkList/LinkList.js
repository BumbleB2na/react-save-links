import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
	}
}));

export default function LinkList() {
	const classes = useStyles();

	// constructor
	const [stateHyperlinks, setStateHyperlinks] = React.useState([]);

	const [openSnackbarForError, setOpenSnackbarForError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
  	
	// componentDidMount / componentDidUpdate
	React.useEffect(() => {
		fetchHyperlinks();
	}, []);

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
			const hyperlinks = await Data.fetchHyperlinks();
			setStateHyperlinks(hyperlinks);
		}
		catch(error) {
			showErrorMessage(linkListErrors.READ);
			console.error(error);
		}
		await syncHyperlinks();
	};
	const syncHyperlinks = async () => {
		try {
			const hyperlinks = await Data.syncHyperlinks();
			setStateHyperlinks(hyperlinks);
		}
		catch(error) {
			showErrorMessage(linkListErrors.SYNC);
			console.error(error);
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

	const linkListItemEls = stateHyperlinks.map(hyperlink => {
		return (
			<React.Fragment key={hyperlink.id}>
				<LinkListItem
					id={hyperlink.id}
					title={hyperlink.title}
					url={hyperlink.url}
					visited={hyperlink.visited}
					onUpdateHyperlink={(hyperlink) => updateHyperlink(hyperlink)}
					onDeleteHyperlink={(hyperlink) => deleteHyperlink(hyperlink)}
				></LinkListItem>
				<Divider />
			</React.Fragment>
		);
	});

	return (
		<React.Fragment>
			<Snackbar open={openSnackbarForError} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					{errorMessage}
				</Alert>
			</Snackbar>
			<List className={classes.root}>
				<LinkListItemAdd
					onSaveNewHyperlink={(hyperlink) => createHyperlink(hyperlink)}
				/>
				<Divider />
				{linkListItemEls}
			</List>
		</React.Fragment>
	);
}