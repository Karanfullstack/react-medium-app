import React, {useState, useEffect} from "react";
import postService from "../services/postService";
import Container from "../container/Container";
import {Loading, PostCard} from "../common";
import {Link} from "react-router-dom";

const AllPosts = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	console.log(posts);

	// Retrieve all posts
	useEffect(() => {
		postService
			.listDocuments()
			.then((data) => {
				setPosts(data.documents);

				setLoading(false);
			})
			.catch((error) => {
				console.log(error, "during fetch");
				setLoading(false);
			});
	}, []);

	return loading ? (
		<Loading className="w-full" />
	) : (
		<div className="w-full py-5">
			<Container>
				<div className="flex  flex-wrap gap-3">
					{posts.map((post) => (
						<div key={post.$id} className="p-2 w-1/4">
							<Link to={`post/${post.$id}`}>
								<PostCard post={post} />
							</Link>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default AllPosts;
