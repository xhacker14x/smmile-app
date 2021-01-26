import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function DataFetch(){
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios.get('http://slimreactjs.iworkone.com/slim/api/users')
		.then(res =>{
			setPosts(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	})

	return(
		<div style={{marginTop: '30px'}}>
			<ul>
				{
					posts.map(post => (
						<div>
							<li key={post.id}>{post.id}, {post.first_name}, {post.last_name}, {post.phone}, {post.email}, {post.address}, {post.city}, {post.state}</li>
						</div>
					))
				}
			</ul>
		</div>
	);

}