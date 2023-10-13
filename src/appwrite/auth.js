import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appWriteUrl)
			.setProject(conf.appWriteProjectId);
		this.account = new Account(this.client);
	}

	// Signup Method
	async createAccount({email, password, name}) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				// call another method
				return this.logIn({email, password});
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	// Login Method
	async logIn({email, password}) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite service :: getCurrentUser :: error", error);
		}
		return null;
	}

	async logOut() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}
}

const authService = new AuthService();

export default authService;
