import React from "react";
import storageService from "../services/storageService";

//  TODO: LINK ROUTER IMPLEMENTATION
const PostCard = ({$id, title, featuredImage}) => {
	return (
		<div className="w-full bg-gray-900 rounded-xl p-4">
			<div className="w-full justify-center mb-4">
				<img src={storageService.previewFile(featuredImage)} alt="" />
			</div>
			<h2>{title}</h2>
		</div>
	);
};

export default PostCard;
