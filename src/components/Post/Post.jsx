import React, {useCallback, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import storageService from "../../services/storageService";
import postService from "../../services/postService";
import {Button, Input, RTE, Select} from "../../common";

const Post = ({post}) => {
	const userData = useSelector((state) => state.auth.userData);

	const {control, register, setValue, getValues, handleSubmit, watch} = useForm(
		{
			defaultValues: {
				title: post?.title || "",
				content: post?.content || "",
				status: post?.status || "inactive",
				slug: post?.slug || "",
			},
		}
	);

	// Submit form
	const onPost = async (data) => {
		if (post) {
			const file = data.image[0] ? data.image[0] : null;
			if (file) {
				await storageService.deleteFile(post.featuredImage);
			}
			const dbPost = await postService.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
			});

			if (dbPost) {
				console.log("Redicret to post page");
				return;
			}
		} else {
			const file = await storageService.uploadFile(data.image[0]);
			if (file) {
				const fileId = file.$id;
				const dbPost = await postService.createDocument({
					...data,
					featuredImage: fileId,
					userId: userData.$id,
				});
				if (dbPost) {
					console.log("post Created");
				}
			}
		}
	};

	// Slug Convert
	const slugTransform = useCallback((value) => {
		return value
			.toLowerCase()
			.replace(/ /g, "-")
			.replace(/[^\w-]+/g, "");
	});

	// Update Slug
	useEffect(() => {
		const subscription = watch((value, {name}) => {
			if (name === "title") {
				setValue("slug", slugTransform(value.title));
			}
			return () => subscription.unsubscribe();
		});
	}, [slugTransform]);

	return (
		<form
			onSubmit={handleSubmit(onPost)}
			className="py-5 px-5 gap-5 flex flex-wrap "
		>
			{/* Title, Slug, Editor */}
			<div className="w-3/5 px-2  flex flex-col gap-3 items-center justify-center">
				<Input
					labelClass="text-2xl tracking-wider"
					label="Title"
					placeholder="Title"
					className="mb-4 "
					{...register("title", {required: true})}
				/>

				<Input
					labelClass="text-2xl tracking-wider"
					label="Slug"
					placeholder="Slug"
					className="mb-4 "
					{...register("slug", {required: true})}
					onInput={(e) => setValue("slug", slugTransform(e.target.value))}
				/>
				<RTE
					control={control}
					name="content"
					defaultValue={getValues("content")}
				/>
			</div>

			{/* Upload Image, Status, Submit Button  */}
			<div className="w-1/3 px-2 flex flex-col gap-6 items-center">
				{post && (
					<div className="w-full mb-4">
						<img
							src={storageService.previewFile(post.featuredImage)}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Input
					type="file"
					label="featured Image"
					{...register("image", {required: !post})}
					accept="image/png, image/jpg, image/jpeg, image/gif"
				/>

				<Select
					defaultValue={getValues("status")}
					{...register("status")}
					options={["active", "inactive"]}
				/>

				<Button className="bg-orange-300" type="submit">
					{post ? "UPDATE" : "SUBMIT"}
				</Button>
			</div>
		</form>
	);
};

export default Post;
