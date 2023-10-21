import {useState} from "react";
import "./App.css";
import postService from "./services/postService";
function App() {
	// Raw Data
	const doc = {
		title: "How To Get All Document",
		content: "lorem lorem lorem lorem lorem",
		featuredImage: "http://featuredimage.jpg",
		status: "active",
		userId: "user321j",
	};

	// Create Document
	const createDocument = async () => {
		try {
			const document = await postService.createDocument(doc);
			if (document) console.log(document);
		} catch (error) {
			console.log(error);
		}
	};

	// Document ID
	const document_Id = "6533fad310b4dd715e45";

	// Update Document
	const updateDocument = async () => {
		try {
			const document = await postService.updateDocument(document_Id, doc);
			if (document) console.log(document);
		} catch (error) {
			console.log(error);
		}
	};

	// Delete Document
	const deleteDocument = async () => {
		try {
			const document = await postService.deleteDocument(document_Id);
			if (document) {
				console.log(document, "Deleted Successfully");
			}
		} catch (error) {
			console.log(error);
		}
	};

	// List Document - Get Single Document
	const listDocument = async () => {
		try {
			const document = await postService.listDocument(document_Id);
			if (document) {
				console.log(document);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// List Documents - Get All Documents
	const listDocuments = async () => {
		try {
			const data = await postService.listDocuments();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	
// commit
	return (
		<div className=" bg-slate-300">
			<h1 className=" mt-36 text-4xl text-gray-900 text-center">Vite React</h1>
			<button onClick={listDocuments}> Get All Document</button>
		</div>
	);
}

export default App;
