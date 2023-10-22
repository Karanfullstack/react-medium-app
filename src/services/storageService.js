import {Client, Storage, ID} from "appwrite";
import environment from "../environment/environment";

class StorageService {
	client = new Client();
	stroage;
	constructor() {
		this.client
			.setEndpoint(environment.appwriteUrl)
			.setProject(environment.appwriteProjectId);
		this.stroage = new Storage(this.client);
	}

	// Upload File @Successful
	async uploadFile(file) {
		try {
			return await this.stroage.createFile(
				environment.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite Upload Error");
			throw error;
		}
	}

	// Delete File @Successful
	async deleteFile(fileId) {
		try {
			await this.stroage.deleteFile(environment.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			throw error;
		}
	}

	// Get Preview File @Sucessful
	previewFile(fileId) {
		try {
			return this.stroage.getFilePreview(environment.appwriteBucketId, fileId);
		} catch (error) {
			throw error;
		}
	}
}

const storageService = new StorageService();

export default storageService;
