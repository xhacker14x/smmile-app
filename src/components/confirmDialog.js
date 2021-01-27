import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button} from '@material-ui/core';

export default function ConfirmDialog(props){
	const {confirmDialog, setConfirmDialog} = props;

	return(
		<Dialog open={confirmDialog.isOpen}>
			<DialogTitle>

			</DialogTitle>

			<DialogContent>
				<Typography variant='h6'>
					{confirmDialog.title}
				</Typography>
				<Typography variant='subtitle2'>
					{confirmDialog.subTitle}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" color="default" onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}>No</Button>
				<Button variant="contained" color="primary" onClick={confirmDialog.onConfirm}>Yes</Button>
			</DialogActions>
		</Dialog>
	)
}