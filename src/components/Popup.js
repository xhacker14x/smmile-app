import React from 'react';
import {Dialog, DialogTitle, DialogContent, Typography, Button} from '@material-ui/core';

export default function Popup(props){
	const {title, children, openPopup, setOpenPopup} = props;


	return(
		<Dialog open={openPopup} maxWidth='md'>
			<DialogTitle children={title}>
			</DialogTitle>
			<DialogContent dividers>
				{children}
			</DialogContent>
		</Dialog>
	)
}