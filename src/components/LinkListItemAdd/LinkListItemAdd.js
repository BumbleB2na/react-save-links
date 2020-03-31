import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';

import LinkListItemSaveDialog from '../../components/LinkListItemSaveDialog/LinkListItemSaveDialog';

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
				className={classes.addHyperlink}
				button component="button"
				onClick={handleClickToOpenDialog}
			>
				<ListItemIcon>
					<AddIcon />
				</ListItemIcon>
				<ListItemText>
					New Hyperlink
				</ListItemText>
			</ListItem>
			<LinkListItemSaveDialog
				url="https://"
				open={stateIsDialogOpen}
				onCloseDialog={handleCloseDialog}
				onSaveNewHyperlink={props.onSaveNewHyperlink}
			/>
		</React.Fragment>
	);
}