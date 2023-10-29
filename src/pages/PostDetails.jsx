import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams, useNavigate, Link} from "react-router-dom";
import postService from "../services/postService";
import storageService from "../services/storageService";
import Container from "../container/Container";
import {Button} from "../common";

const PostDetails = () => {
	const {post, setPost} = useState();
	const {slug} = useParams();
	const navigate = useNavigate();
	const {userData} = useSelector((state) => state.auth);

	const Author = post && userData ? post.userId === userData.$id : false;

	useEffect(() => {
		if (slug) {
			postService
				.listDocument(slug)
				.then((data) => {
					if (data) {
						setPost(data);
					} else {
						navigate("/");
					}
				})
				.catch((error) => console.log(error));
		} else {
			navigate("/");
		}
	}, [navigate, slug]);

	const deletePost = () => {
		postService
			.deleteDocument(post.$id)
			.then((status) => {
				if (status) {
					storageService.deleteFile(post.feauredImage);
					navigate("/");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="py-8">
			<Container>
				<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
					<img
						src={storageService.previewFile(post.feauredImage)}
						alt={post.title}
						className="rounded-xl"
					/>
					{Author && (
						<div className="absolute right-6 top-6">
							<Link to={`/edit-post/${slug}`}>
								<Button bgColor="bg-green-500" className="mr-3">
									Edit
								</Button>
							</Link>
							<Button bgColor="bg-red-500" onClick={deletePost}>
								Delete
							</Button>
						</div>
					)}
				</div>
				<div className="w-full mb-6">
					<h1 className="text-2xl font-bold">{post.title}</h1>
				</div>
				<div className="browser-css">{post.content}</div>
			</Container>
		</div>
	);
};

export default PostDetails;
