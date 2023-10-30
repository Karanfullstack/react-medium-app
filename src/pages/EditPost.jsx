import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import postService from "../services/postService";
import Container from "../container/Container";
import {Post} from "../components";

const EditPost = () => {
	const [post, setPost] = useState(null);
	const {slug} = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			postService
				.listDocument(slug)
				.then((data) => {
					if (data) {
						setPost(data);
					}
				})
				.catch((error) => console.log(error));
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	return <div className="py-8 px-8">{post && <Post post={post} />}</div>;
};

export default EditPost;
