import {Client, ID, Databases, Query} from "appwrite";
import environment from "../environment/environment";

class PostService {
	client = new Client();
	databases;

	// Settings Database
	constructor() {
		this.client
			.setEndpoint(environment.appwriteUrl)
			.setProject(environment.appwriteProjectId);
		this.databases = new Databases(this.client);
	}

	// Create Document @Successful
	async createDocument({title, content, featuredImage, status, userId}) {
		try {
			return await this.databases.createDocument(
				environment.appwriteDatabseId,
				environment.appwriteCollectionId,
				ID.unique(),
				{title, content, featuredImage, status, userId}
			);
		} catch (error) {
			throw error;
		}
	}

	// Update Document @Successful
	async updateDocument(document_Id, {title, content, featuredImage, status}) {
		try {
			return await this.databases.updateDocument(
				environment.appwriteDatabseId,
				environment.appwriteCollectionId,
				document_Id,
				{title, content, featuredImage, status}
			);
		} catch (error) {
			throw error;
		}
	}

	// Delete Document @Sucessful
	async deleteDocument(document_Id) {
		try {
			await this.databases.deleteDocument(
				environment.appwriteDatabseId,
				environment.appwriteCollectionId,
				document_Id
			);
			return true;
		} catch (error) {
			throw error;
		}
	}

	// List Document @Successful - Get Single Document
	async listDocument(document_Id) {
		try {
			return await this.databases.getDocument(
				environment.appwriteDatabseId,
				environment.appwriteCollectionId,
				document_Id
			);
		} catch (error) {
			throw error;
		}
	}

	// List Documents @Sucessful - Get All Documents
	async listDocuments(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				environment.appwriteDatabseId,
				environment.appwriteCollectionId,
				queries
			);
		} catch (error) {
			throw error;
		}
	}
}

const postService = new PostService();
export default postService;
