import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import {Controller} from "react-hook-form";

const RTE = ({label, name, control, defaultValue}) => {
	return (
		<div className="w-full flex flex-wrap">
			{label && <label className="inline-block mb-1 p-1">{label}</label>}
			<Controller
				name={name}
				control={control}
				render={({field: {onChange}}) => (
					<Editor
						content_style="body {width: 100%;}"
						initialValue={defaultValue}
						init={{
							initialValue: defaultValue,
							height: 500,
							width: 800,
							menubar: true,
							plugins: [
								"image",
								"advlist",
								"autolink",
								"lists",
								"link",
								"image",
								"charmap",
								"preview",
								"anchor",
								"searchreplace",
								"visualblocks",
								"code",
								"fullscreen",
								"insertdatetime",
								"media",
								"table",
								"code",
								"help",
								"wordcount",
								"anchor",
							],
							toolbar:
								"undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
							content_style:
								"body {font-family:Helvetica,Arial,sans-serif; font-size:20px }",
						}}
						onEditorChange={onChange}
					/>
				)}
			/>
		</div>
	);
};

export default RTE;
