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

	// Upload File
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

	// Delete File
	async deleteFile(fileId) {
		try {
			await this.stroage.deleteFile(environment.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			throw error;
		}
	}
}

const storageService = new StorageService();

export default storageService;
