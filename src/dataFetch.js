import React, {useState, useEffect} from 'react';
import {Button} from '@material-ui/core';
import axios from 'axios';
import Notification from './components/Notification';
import ConfirmDialog from './components/confirmDialog';

export default function DataFetch(){
	const [posts, setPosts] = useState([]);
	const [notify,setNotify] = useState({isOpen: false, message: '', type: ''});
	const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subtitle: ''});

	useEffect(() => {
		axios.get('/slim/api/users')
		.then(res =>{
			setPosts(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	})

	const handleDelete = (id,name) =>{
		setConfirmDialog({
			...confirmDialog,
			isOpen: false
		})
		axios.delete(`/slim/api/users/delete/${id}`)
		  .then(function (response) {
		    setNotify({
		    	isOpen: true,
		    	message: `${name} has been successfully deleted.`,
		    	type: 'success'
		    })
		})	
	}

	const handleUpdate = (id) =>{	
		alert(id);
	}

	return(
		<React.Fragment>
			<div>
				<Notification 
					notify={notify}
					setNotify={setNotify}
				/>
				<ConfirmDialog 
					confirmDialog={confirmDialog}
					setConfirmDialog={setConfirmDialog}
				/>
			</div>
			<div style={{marginTop: '30px'}}>
				<ul>
					{
						posts.map(post => (
							<div>
								<li key={post.id} style={{marginBottom: '25px'}}>{post.first_name}, {post.last_name}, {post.phone} &nbsp;&nbsp;  <Button variant="contained" color="secondary" onClick={() => { setConfirmDialog({
		    isOpen: true,
			title: 'Are you sure you want to delete this record?',
			subTitle: 'You cannot undo this operation',
			onConfirm: () => { handleDelete(post.id, post.first_name) }
		})
		 }}>Delete</Button> &nbsp; <Button variant="contained" color="primary" onClick={() => { handleUpdate(post.id) }}>Update</Button> </li>
							</div>
						))
					}
				</ul>
			</div>
		</React.Fragment>
	);

}