import React, {useState, useEffect} from "react";
import postService from "../services/postService";
import Container from "../container/Container";
import {Loading, PostCard} from "../common";

const AllPosts = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		postService
			.listDocuments()
			.then((data) => {
				setPosts(data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
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
						<div className="p-2 w-1/4">
							<PostCard post={post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default AllPosts;
