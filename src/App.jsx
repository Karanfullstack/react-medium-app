import {useState} from "react";
import "./App.css";
import postService from "./services/postService";
import storageService from "./services/storageService";
import {useDispatch} from "react-redux";
import {login, logout} from "./features/authSlice/authSlice";

function App() {
	const dispatch = useDispatch();

	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState(null);
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

	// Onchange File Handler
	const fileHandleChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	// Upload file Handler
	const uploadHandeler = async () => {
		try {
			setLoading(true);
			if (selectedFile) {
				const file = await storageService.uploadFile(selectedFile);
				if (file) {
					console.log(file);
					console.log("Uploaded Sucessfully");
				}
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	// Delete File
	const deleteFile = async () => {
		const fileId = "65350058c81c81933a40";
		setLoading(true);
		try {
			const file = await storageService.deleteFile(fileId);
			console.log("File Deleted with Id: ");
			console.log(file);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	// Preview File
	const getPreview = () => {
		const fileId = "65350c4bea01b4ade520";
		try {
			const file = storageService.previewFile(fileId);
			console.log(file);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className=" bg-slate-300">
			<h1 className=" mt-36 text-4xl text-gray-900 text-center">Vite React</h1>
			<button onClick={listDocuments}> Get All Document</button>
			<input onChange={fileHandleChange} type="file" />
			<button onClick={uploadHandeler}>Login</button>
		</div>
	);
}

export default App;
