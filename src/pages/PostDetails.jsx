import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams, useNavigate, Link} from "react-router-dom";
import postService from "../services/postService";
import storageService from "../services/storageService";
import Container from "../container/Container";
import {Button} from "../common";
import parse from "html-react-parser";

const PostDetails = () => {
	const [post, setPost] = useState();
	console.log(post, "All possts");

	const {id} = useParams();
	const navigate = useNavigate();
	const {userData} = useSelector((state) => state.auth);

	const Author = post && userData ? post.userId === userData.$id : false;

	useEffect(() => {
		if (id) {
			postService
				.listDocument(id)
				.then((data) => {
					if (data) {
						setPost(data);
						console.log(data);
					} else {
						navigate("/");
					}
				})
				.catch((error) => console.log(error));
		} else {
			navigate("/");
		}
	}, [navigate, id]);

	const deletePost = () => {
		if (post) {
			postService
				.deleteDocument(post.$id)
				.then((status) => {
					if (status) {
						storageService.deleteFile(post.featuredImage);
						navigate("/");
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	return (
		<div className="py-8">
			<Container>
				{post && (
					<div className="w-full  flex justify-center mb-4 relative  rounded-xl p-2">
						<img
							src={storageService.previewFile(post.featuredImage)}
							alt={post.title}
							className="rounded-xl w-[600px] "
						/>
						{Author && (
							<div className="absolute right-6 top-6">
								<Link to={`/edit-post/${id}`}>
									<Button className="mr-3 bg-green-500">Edit</Button>
								</Link>
								<Button className="bg-red-500" onClick={deletePost}>
									Delete
								</Button>
							</div>
						)}
					</div>
				)}
				<div className="w-full mb-6">
					{post && <h1 className="text-2xl font-bold">{post.title}</h1>}
				</div>
				{post && <div className="browser-css">{parse(post.content)}</div>}
			</Container>
		</div>
	);
};

export default PostDetails;
