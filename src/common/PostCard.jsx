import React from "react";
import storageService from "../services/storageService";

//  TODO: LINK ROUTER IMPLEMENTATION
const PostCard = ({post}) => {
	return (
		<div className="w-full bg-gray-800 text-white rounded-xl p-4">
			<div className="w-full justify-center p-3 bg-gray-850 mb-4">
				<img className="h-[200px] w-[200px] rounded-md"
					src={storageService.previewFile(post.featuredImage)}
					alt={post.title}
				/>
			</div>
			<h2>{post?.title}</h2>
		</div>
	);
};

export default PostCard;
