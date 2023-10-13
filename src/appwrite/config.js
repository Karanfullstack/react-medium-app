import conf from "../conf/conf";
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client
			.setEndpoint(conf.appWriteUrl)
			.setProject(conf.appWriteProjectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	// create post
	async createPost({title, slug, content, featuredImage, status, userId}) {
		try {
			return await this.databases.createDocument(
				conf.appWriteDatabseId,
				conf.appWriteCollectionId,
				slug,
				{title, content, featuredImage, status, userId}
			);
		} catch (error) {
			throw error;
		}
	}

	// update post
	async updatePost(slug, {title, content, featuredImage, status}) {
		try {
			return await this.databases.updateDocument(
				conf.appWriteDatabseId,
				conf.appWriteCollectionId,
				slug,
				{title, content, featuredImage, status}
			);
		} catch (error) {
			throw error;
		}
	}

	// delete post
	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appWriteDatabseId,
				conf.appWriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log("Appwrite service :: deletePost :: error", error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appWriteDatabseId,
				conf.appWriteCollectionId,
				slug
			);
		} catch (error) {
			console.log("Appwrite service :: getPost :: error", error);
			return false;
		}
	}

	// get active posts
	async getPosts(queryies = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				conf.appWriteDatabseId,
				conf.appWriteProjectId,
				queryies
			);
		} catch (error) {
			console.log("Appwrite service :: getPosts :: error", error);
			return false;
		}
	}

	// file upload service
	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appWriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite service :: UploadFile :: error", error);
			return false;
		}
	}

	// delete file
	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite service :: deleteFile :: error", error);
			return false;
		}
	}

	// file preview
	getFilePreview(fileId) {
		return this.bucket.getFilePreview(conf.appWriteBucketId, fileId);
	}
}
