import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import postService from "../services/postService";
import Container from "../container/Container";
import {Post} from "../components";
import {useSelector} from "react-redux";

const EditPost = () => {
	const userData = useSelector((state) => state.auth.userData);

	const [post, setPost] = useState(null);
	const {slug} = useParams();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (slug) {
			postService
				.listDocument(slug)
				.then((data) => {
					if (data.userId !== userData.$id) {
						navigate("/");
					}
					setPost(data);
				})
				.catch((error) => console.log(error));
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	return <Container>{post && <Post post={post} />}</Container>;
};

export default EditPost;
